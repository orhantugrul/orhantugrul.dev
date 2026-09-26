import { playlists } from "$lib/server/playlists";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => ({
  playlists: (await playlists()).toReversed(),
});
