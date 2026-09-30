import { env } from "$env/dynamic/private";
import type { Playlist } from "$lib/types";
import { accessToken } from "./spotify";

type SpotifyPlaylist = {
  id: string;
  name: string;
  description: string;
  public: boolean;
  owner: { id: string };
  external_urls: { spotify: string };
};

type Item = {
  added_at: string;
  track: { type: string } | null;
};

let pressing: Promise<Playlist[]> | null = null;

/**
 * The public playlists on my Spotify profile, oldest first. They are read
 * once per build and baked into the footer and llms.txt, so a new one shows up with
 * the next deploy. Without credentials the list is empty.
 */
export function playlists(): Promise<Playlist[]> {
  return (pressing ??= press());
}

async function press(): Promise<Playlist[]> {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN)
    return [];

  const headers = {
    authorization: `Bearer ${await accessToken({ SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN }, fetch)}`,
  };
  const get = async <T>(url: string): Promise<T> => {
    const response = await fetch(new URL(url, "https://api.spotify.com/v1/"), {
      headers,
    });
    if (!response.ok) throw new Error(`spotify ${url}: ${response.status}`);
    return response.json();
  };

  const me = await get<{ id: string }>("me");
  const { items } = await get<{ items: SpotifyPlaylist[] }>(
    "me/playlists?limit=50"
  );
  const mine = items.filter((p) => p.public && p.owner.id === me.id);

  const pressed = await Promise.all(
    mine.map(async (p) => {
      const added: Item[] = [];
      let next: string | null =
        `playlists/${p.id}/items?limit=50&fields=next,items(added_at,track(type))`;
      while (next) {
        const page: { next: string | null; items: Item[] } = await get(next);
        added.push(...page.items);
        next = page.next;
      }
      // Local files, podcast episodes and removed tracks don't count.
      const kept = added.filter((item) => item.track?.type === "track");
      const dates = kept.map((item) => item.added_at).sort();
      return {
        title: p.name,
        note: plain(p.description),
        url: p.external_urls.spotify,
        started: dates[0] ?? "",
        updated: dates.at(-1) ?? "",
        tracks: kept.length,
      };
    })
  );

  return pressed
    .sort((a, b) => a.started.localeCompare(b.started))
    .map((playlist, i) => ({ ...playlist, number: i + 1 }));
}

/** Spotify sends descriptions as escaped HTML, links included. */
function plain(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")
    .trim();
}
