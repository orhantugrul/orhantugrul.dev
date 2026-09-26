import { playlists } from "$lib/server/playlists";
import { writings } from "$lib/writings";

export const prerender = true;

export async function GET() {
  const origin = "https://orhantugrul.dev";

  const entries = [
    { loc: origin },
    { loc: `${origin}/writing` },
    ...writings.map(({ slug, date }) => ({
      loc: `${origin}/writing/${slug}`,
      lastmod: date,
    })),
    { loc: `${origin}/playlists` },
    ...(await playlists()).map(({ slug, updated }) => ({
      loc: `${origin}/playlists/${slug}`,
      lastmod: updated.slice(0, 10),
    })),
  ];

  const urls = entries
    .map(({ loc, lastmod }: { loc: string; lastmod?: string }) =>
      lastmod
        ? `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
        : `  <url><loc>${loc}</loc></url>`
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`,
    { headers: { "content-type": "application/xml" } }
  );
}
