import { building } from "$app/environment";
import { playlists } from "$lib/server/playlists";
import type { LayoutServerLoad } from "./$types";

// The footer's latest playlist, read while the site is built so a page the
// worker renders later (a 404) never calls Spotify.
export const load: LayoutServerLoad = async () => {
  if (!building) return { latest: null };
  const all = await playlists().catch(() => []);
  const latest = all.toSorted((a, b) => b.updated.localeCompare(a.updated))[0];
  return {
    latest: latest
      ? {
          slug: latest.slug,
          number: latest.number,
          title: latest.title,
          tracks: latest.tracks.length,
          updated: latest.updated,
        }
      : null,
  };
};
