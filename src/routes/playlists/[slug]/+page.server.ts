import { playlists } from "$lib/server/playlists";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = async () =>
  (await playlists()).map(({ slug }) => ({ slug }));

export const load: PageServerLoad = async ({ params }) => {
  const playlist = (await playlists()).find(({ slug }) => slug === params.slug);
  if (!playlist) error(404, "Playlist not found");
  return { playlist };
};
