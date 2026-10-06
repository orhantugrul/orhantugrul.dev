export const prerender = true;

export function GET() {
  const sitemap = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `  <url><loc>https://orhantugrul.dev</loc></url>`,
    `</urlset>`,
  ].join("\n");

  return new Response(sitemap, {
    headers: { "content-type": "application/xml" },
  });
}
