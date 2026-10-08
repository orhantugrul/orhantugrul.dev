import { json } from "@sveltejs/kit";
import {
  getAccessToken,
  getNowPlaying,
  getRecentPlayed,
  type NowPlaying,
} from "$lib/spotify";
import type { RequestHandler } from "./$types";

export const prerender = false;

// Never a public URL: Cloudflare would serve the entry straight to visitors.
const LIVE_CACHE_KEY = "https://orhantugrul.dev/_cache/spotify/playing/live";
const RECENT_CACHE_KEY =
  "https://orhantugrul.dev/_cache/spotify/playing/recent";

const TEN_SECONDS = 10;
const ONE_YEAR = 31_536_000;

const NO_STORE = { headers: { "cache-control": "no-store" } };

function cacheFor(value: NowPlaying | null, seconds: number) {
  return json(value, { headers: { "cache-control": `max-age=${seconds}` } });
}

async function getPlaying(
  env: App.Platform["env"],
): Promise<NowPlaying | null> {
  const accessToken = await getAccessToken({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    refreshToken: env.SPOTIFY_REFRESH_TOKEN,
  });

  const current = await getNowPlaying(accessToken);

  // Podcast episodes have no album, so they don't count as a song.
  if (current?.item?.album) {
    return {
      state: current.is_playing ? "playing" : "paused",
      track: current.item.name,
      artist: current.item.artists.map(({ name }) => name).join(", "),
      length: current.item.duration_ms,
      progress: current.progress_ms ?? 0,
      sampledAt: Date.now(),
    };
  }

  const recent = await getRecentPlayed(accessToken);

  const [last] = recent.items;
  if (!last) {
    return null;
  }

  return {
    state: "offline",
    track: last.track.name,
    artist: last.track.artists.map(({ name }) => name).join(", "),
    length: last.track.duration_ms,
    progress: 0,
    sampledAt: Date.parse(last.played_at),
  };
}

export const GET: RequestHandler = async ({ platform }) => {
  if (!platform) {
    return json(null);
  }

  const cache = platform.caches.default as unknown as Cache;

  const cached = await cache.match(LIVE_CACHE_KEY);
  if (cached) {
    return json(await cached.json(), NO_STORE);
  }

  try {
    const playing = await getPlaying(platform.env);
    if (playing) {
      platform.ctx.waitUntil(
        Promise.all([
          cache.put(LIVE_CACHE_KEY, cacheFor(playing, TEN_SECONDS)),
          cache.put(RECENT_CACHE_KEY, cacheFor(playing, ONE_YEAR)),
        ]),
      );
      return json(playing, NO_STORE);
    }
  } catch (error) {
    console.error(error);
  }

  const last = await cache.match(RECENT_CACHE_KEY);
  const offline: NowPlaying | null = last
    ? { ...(await last.json()), state: "offline", progress: 0 }
    : null;

  platform.ctx.waitUntil(
    cache.put(LIVE_CACHE_KEY, cacheFor(offline, TEN_SECONDS)),
  );
  return json(offline, NO_STORE);
};
