import { findWriting, writings } from "$lib/writings";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageLoad } from "./$types";

/** Prerender straight off the index, so nothing depends on the crawler. */
export const entries: EntryGenerator = () =>
  writings.map(({ slug }) => ({ slug }));

export const load: PageLoad = async ({ params }) => {
  const writing = findWriting(params.slug);
  if (!writing) error(404, "Writing not found");

  const { default: content, metadata } = await writing();
  return { content, metadata, slug: params.slug };
};
