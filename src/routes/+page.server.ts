import type { Feed } from "$types/feed";
import type { PageServerLoad } from "./$types";

const FEED_URL = "https://medium-rsjs-latest.onrender.com/api/feed/@orhanbytes";

export const load: PageServerLoad = async () => {
  const response = await fetch(FEED_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return { feed: { posts: [] } };
  }

  const feed: Feed = await response.json();
  return { feed };
};
