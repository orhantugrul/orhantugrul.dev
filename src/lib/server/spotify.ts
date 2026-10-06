export type Secrets = {
  SPOTIFY_CLIENT_ID?: string;
  SPOTIFY_CLIENT_SECRET?: string;
  SPOTIFY_REFRESH_TOKEN?: string;
};

// An access token lasts an hour; an isolate that stays warm reuses it.
let token: { value: string; expires: number } | null = null;

export async function accessToken(
  secrets: Required<Secrets>,
  fetcher: typeof fetch,
) {
  if (token && token.expires > Date.now() + 60_000) return token.value;
  const response = await fetcher("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      authorization: `Basic ${btoa(`${secrets.SPOTIFY_CLIENT_ID}:${secrets.SPOTIFY_CLIENT_SECRET}`)}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: secrets.SPOTIFY_REFRESH_TOKEN,
    }),
  });
  if (!response.ok) throw new Error(`token: ${response.status}`);
  const body: { access_token: string; expires_in: number } =
    await response.json();
  token = {
    value: body.access_token,
    expires: Date.now() + body.expires_in * 1000,
  };
  return token.value;
}
