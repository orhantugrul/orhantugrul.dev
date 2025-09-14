import type { Feed } from "$types/feed";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const FEED_URL = "https://medium-rsjs-latest.onrender.com/api/feed/@orhanbytes";

export const GET: RequestHandler = async () => {
  const response = await fetch(FEED_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    error(500, "Failed to fetch feed");
  }

  const data: Feed = await response.json();
  return json(data);
};
