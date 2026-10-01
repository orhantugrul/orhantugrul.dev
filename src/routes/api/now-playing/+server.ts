import { json } from "@sveltejs/kit";
import { accessToken, type Secrets } from "$lib/server/spotify";
import type { NowPlaying } from "$lib/types";
import type { RequestHandler } from "./$types";

// The one route the worker answers live; everything else is prebuilt.
export const prerender = false;

type Track = {
  name: string;
  duration_ms: number;
  album?: object;
};

function shape(
  track: Track,
  state: NowPlaying["state"],
  progress: number,
  sampledAt: number
): NowPlaying {
  return {
    state,
    track: track.name,
    length: track.duration_ms,
    progress,
    sampledAt,
  };
}

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

  const authorizationHeaders = {
    authorization: `Bearer ${await accessToken(secrets as Required<Secrets>, fetcher)}`,
  };

  // 204 means nothing is loaded in any player; a podcast has no `album`.
  const current = await fetcher(
    "https://api.spotify.com/v1/me/player/currently-playing",
    { headers: authorizationHeaders }
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
    { headers: authorizationHeaders }
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
const LAST_ANSWER_KEY = "https://orhantugrul.dev/api/now-playing/last";
// Every open tab polls this route. A short shared cache means one Spotify
// lookup per data centre answers all of them, well inside Spotify's limits.
const FRESH_ANSWER_KEY = "https://orhantugrul.dev/api/now-playing/fresh";
const FRESH_SECONDS = 10;
const ONE_YEAR_SECONDS = 31_536_000;

const stored = (value: unknown, seconds: number) =>
  new Response(JSON.stringify(value), {
    headers: { "cache-control": `max-age=${seconds}` },
  });

export const GET: RequestHandler = async ({ platform, fetch }) => {
  const headers = { "cache-control": "no-store" };
  const cache = (platform?.caches as { default?: Cache } | undefined)?.default;
  const keep = (url: string, value: unknown, seconds: number) => {
    const cacheWrite = cache?.put(url, stored(value, seconds));
    if (cacheWrite) platform?.ctx.waitUntil(cacheWrite);
  };

  const fresh = await cache?.match(FRESH_ANSWER_KEY);
  if (fresh) return json(await fresh.json(), { headers });

  let answer = await ask((platform?.env ?? {}) as Secrets, fetch).catch(
    () => null
  );

  if (answer) {
    keep(LAST_ANSWER_KEY, answer, ONE_YEAR_SECONDS);
  } else {
    const remembered = await cache?.match(LAST_ANSWER_KEY);
    if (remembered) {
      const last: NowPlaying = await remembered.json();
      // Whatever it was doing then, it is not playing now.
      answer = { ...last, state: "offline", progress: 0 };
    }
  }

  keep(FRESH_ANSWER_KEY, answer, FRESH_SECONDS);
  return json(answer, { headers });
};
