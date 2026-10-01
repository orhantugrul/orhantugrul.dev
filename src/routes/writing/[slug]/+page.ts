import { error } from "@sveltejs/kit";
import { findWriting, writings } from "$lib/writings";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = () =>
  writings.map(({ slug }) => ({ slug }));

export const load: PageLoad = async ({ params }) => {
  const writing = findWriting(params.slug);
  if (!writing) error(404, "Writing not found");

  const { default: content, metadata } = await writing();
  return { content, metadata, slug: params.slug };
};
