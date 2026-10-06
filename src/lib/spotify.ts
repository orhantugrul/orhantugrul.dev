export type NowPlaying = {
  state: "playing" | "paused" | "offline";
  track: string;
  length: number;
  progress: number;
  sampledAt: number;
};

export type Track = {
  name: string;
  duration_ms: number;
  album?: object;
};

export type CurrentlyPlaying = {
  is_playing: boolean;
  progress_ms: number | null;
  item: Track | null;
};

export type RecentlyPlayed = {
  items: { track: Track; played_at: string }[];
};

export type Credentials = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

export async function getAccessToken({
  clientId,
  clientSecret,
  refreshToken,
}: Credentials): Promise<string> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Spotify token: ${response.status}`);
  }

  const { access_token } = await response.json();
  return access_token;
}

export async function getNowPlaying(
  accessToken: string,
): Promise<CurrentlyPlaying | null> {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Spotify: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function getRecentPlayed(
  accessToken: string,
): Promise<RecentlyPlayed> {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Spotify: ${response.status}`);
  }

  return response.json();
}
