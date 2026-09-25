import { json } from "@sveltejs/kit";
import type { NowPlaying } from "$lib/types";
import type { RequestHandler } from "./$types";

// The one route the worker answers live; everything else is prebuilt.
export const prerender = false;

type Secrets = {
  SPOTIFY_CLIENT_ID?: string;
  SPOTIFY_CLIENT_SECRET?: string;
  SPOTIFY_REFRESH_TOKEN?: string;
};

type Track = {
  name: string;
  duration_ms: number;
  external_urls: { spotify: string };
  artists: { name: string }[];
  album: { name: string; images: { url: string; width: number }[] };
};

// An access token lasts an hour; an isolate that stays warm reuses it.
let token: { value: string; expires: number } | null = null;

async function accessToken(secrets: Required<Secrets>, fetcher: typeof fetch) {
  if (token && token.expires > Date.now() + 60_000) return token.value;
  const response = await fetcher("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      authorization: `Basic ${btoa(`${secrets.SPOTIFY_CLIENT_ID}:${secrets.SPOTIFY_CLIENT_SECRET}`)}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: secrets.SPOTIFY_REFRESH_TOKEN,
    }),
  });
  if (!response.ok) throw new Error(`token: ${response.status}`);
  const body: { access_token: string; expires_in: number } =
    await response.json();
  token = {
    value: body.access_token,
    expires: Date.now() + body.expires_in * 1000,
  };
  return token.value;
}

/** Only Spotify's own https URLs reach the page's `href` and `src`. */
function trusted(url: string | undefined, host: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === host
      ? url
      : null;
  } catch {
    return null;
  }
}

function shape(
  track: Track,
  state: NowPlaying["state"],
  progress: number,
  at: number
): NowPlaying {
  // The 300px image: enough for the dither, a fraction of the 640px one.
  const images = [...track.album.images].sort((a, b) => a.width - b.width);
  const cover = images.find((image) => image.width >= 300) ?? images.at(-1);
  return {
    state,
    track: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    album: track.album.name,
    cover: trusted(cover?.url, "i.scdn.co"),
    url:
      trusted(track.external_urls.spotify, "open.spotify.com") ??
      "https://open.spotify.com",
    length: track.duration_ms,
    progress,
    at,
  };
}

/** Asks Spotify what is on, or what played last; null when it can't say. */
async function ask(
  secrets: Secrets,
  fetcher: typeof fetch
): Promise<NowPlaying | null> {
  if (
    !secrets.SPOTIFY_CLIENT_ID ||
    !secrets.SPOTIFY_CLIENT_SECRET ||
    !secrets.SPOTIFY_REFRESH_TOKEN
  )
    return null;

  const auth = {
    authorization: `Bearer ${await accessToken(secrets as Required<Secrets>, fetcher)}`,
  };

  // 204 means nothing is loaded in any player; a podcast has no `album`.
  const current = await fetcher(
    "https://api.spotify.com/v1/me/player/currently-playing",
    { headers: auth }
  );
  // Rate limited or failing: don't spend a second call finding out again.
  if (current.status >= 400) throw new Error(`player: ${current.status}`);
  if (current.status === 200) {
    const body: {
      is_playing: boolean;
      progress_ms: number | null;
      item: Track | null;
    } = await current.json();
    if (body.item?.album)
      return shape(
        body.item,
        body.is_playing ? "playing" : "paused",
        body.progress_ms ?? 0,
        Date.now()
      );
  }

  const recent = await fetcher(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    { headers: auth }
  );
  if (!recent.ok) return null;
  const body: { items: { track: Track; played_at: string }[] } =
    await recent.json();
  const [last] = body.items;
  return last
    ? shape(last.track, "offline", 0, Date.parse(last.played_at))
    : null;
}

// The last answer Spotify gave, kept in the edge cache so a failed or empty
// lookup still has a record to show instead of an empty footer.
const LAST = "https://orhantugrul.dev/api/now-playing/last";
// Every open tab polls this route. A short shared cache means one Spotify
// lookup per data centre answers all of them, well inside Spotify's limits.
const FRESH = "https://orhantugrul.dev/api/now-playing/fresh";
const FRESH_SECONDS = 10;

const stored = (value: unknown, seconds: number) =>
  new Response(JSON.stringify(value), {
    headers: { "cache-control": `max-age=${seconds}` },
  });

export const GET: RequestHandler = async ({ platform, fetch }) => {
  const headers = { "cache-control": "no-store" };
  const cache = (platform?.caches as { default?: Cache } | undefined)?.default;
  const keep = (url: string, value: unknown, seconds: number) => {
    const put = cache?.put(url, stored(value, seconds));
    if (put) platform?.ctx.waitUntil(put);
  };

  const fresh = await cache?.match(FRESH);
  if (fresh) return json(await fresh.json(), { headers });

  let answer: NowPlaying | null = null;
  try {
    answer = await ask((platform?.env ?? {}) as Secrets, fetch);
  } catch {
    // Spotify being down falls through to the remembered record.
  }

  if (answer) {
    keep(LAST, answer, 31_536_000);
  } else {
    const remembered = await cache?.match(LAST);
    if (remembered) {
      const last: NowPlaying = await remembered.json();
      // Whatever it was doing then, it is not playing now.
      answer = { ...last, state: "offline", progress: 0 };
    }
  }

  keep(FRESH, answer, FRESH_SECONDS);
  return json(answer, { headers });
};
