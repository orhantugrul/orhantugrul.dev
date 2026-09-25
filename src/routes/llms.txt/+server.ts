import { writings } from "$lib/writings";

export const prerender = true;

const origin = "https://orhantugrul.dev";

// The site in plain Markdown for language models, per llmstxt.org.
export async function GET() {
  const list = writings
    .map(
      ({ slug, title, description }) =>
        `- [${title}](${origin}/writing/${slug}): ${description}`
    )
    .join("\n");

  const body = `# Orhan Tugrul Sahin

> Software engineer in Istanbul building thoughtful products and dependable systems.

Orhan builds software at Paket Mutfak, from the app a courier holds at the door to the service behind it that keeps dispatch, orders and payments in step. Before that, treasury and leasing systems for banks.

## Writing

${list || "- Nothing published yet."}

## Elsewhere

- [GitHub](https://github.com/orhantugrul)
- [X](https://x.com/orhantuurul)
- [LinkedIn](https://www.linkedin.com/in/orhantugrul)
- [Spotify](https://open.spotify.com/user/gntu0y8a2id5en2bh6hvxheo2)
- [Email](mailto:hello@orhantugrul.dev)
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
