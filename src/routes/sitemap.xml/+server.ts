import { site } from "$lib/data";
import { listPosts } from "$lib/posts";

export const prerender = true;

export async function GET() {
  const posts = await listPosts();

  const entries = [
    { loc: site.url },
    { loc: `${site.url}/writing` },
    ...posts.map(({ slug, date }) => ({
      loc: `${site.url}/writing/${slug}`,
      lastmod: date,
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
