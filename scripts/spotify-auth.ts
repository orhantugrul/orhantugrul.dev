/**
 * One-time Spotify login for the footer's now-playing record.
 *
 *   bun run spotify:auth
 *
 * Runs Spotify's authorization code flow against a loopback server that only
 * lives for this run, then writes the refresh token into `.env`. Nothing here
 * is deployed: production never exposes an auth route, it only holds the
 * refresh token as a Worker secret.
 */
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

// Must match a redirect URI registered on the Spotify app exactly. Spotify
// requires the loopback IP rather than `localhost` for local redirects.
const PORT = 8888;
const REDIRECT = `http://127.0.0.1:${PORT}/spotify/callback`;
// Read-only, and only what the footer shows.
const SCOPES = ["user-read-currently-playing", "user-read-recently-played"];
const ENV_FILE = ".env";

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) {
  console.error(
    `Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in ${ENV_FILE} first.`
  );
  process.exit(1);
}

// Ties the callback to this run, so a forged redirect can't plant a token.
const state = randomBytes(24).toString("base64url");

const authorize = new URL("https://accounts.spotify.com/authorize");
authorize.search = new URLSearchParams({
  client_id: id,
  response_type: "code",
  redirect_uri: REDIRECT,
  scope: SCOPES.join(" "),
  state,
}).toString();

/** Writes or replaces one KEY=value line, leaving the rest of the file be. */
function saveEnv(key: string, value: string) {
  let text = "";
  try {
    text = readFileSync(ENV_FILE, "utf8");
  } catch {
    // No file yet: this creates it.
  }
  const lines = text
    .split("\n")
    .filter((line) => line && !line.startsWith(`${key}=`));
  lines.push(`${key}=${value}`);
  writeFileSync(ENV_FILE, `${lines.join("\n")}\n`, { mode: 0o600 });
}

function page(message: string, status = 200) {
  return new Response(
    `<!doctype html><meta charset="utf-8"><title>Spotify</title><body style="font:14px ui-monospace,monospace;padding:40px;background:#0b0c0e;color:#e8e8e6">${message}</body>`,
    { status, headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

const server = Bun.serve({
  hostname: "127.0.0.1",
  port: PORT,
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname !== "/spotify/callback")
      return new Response(null, { status: 404 });

    if (url.searchParams.get("state") !== state)
      return page(
        "State mismatch. Start again with bun run spotify:auth.",
        400
      );
    const error = url.searchParams.get("error");
    const code = url.searchParams.get("code");
    if (error || !code) {
      finish(`Spotify said: ${error ?? "no code"}`, 1);
      return page(
        `Spotify said: ${error ?? "no code"}. You can close this tab.`,
        400
      );
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        authorization: `Basic ${btoa(`${id}:${secret}`)}`,
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT,
      }),
    });
    const body = (await response.json()) as {
      refresh_token?: string;
      scope?: string;
      error_description?: string;
    };
    if (!body.refresh_token) {
      finish(
        `Token exchange failed: ${body.error_description ?? response.status}`,
        1
      );
      return page("Token exchange failed. See the terminal.", 400);
    }

    saveEnv("SPOTIFY_REFRESH_TOKEN", body.refresh_token);
    finish(
      `Saved SPOTIFY_REFRESH_TOKEN to ${ENV_FILE} (scopes: ${body.scope}).`,
      0
    );
    return page("Connected. You can close this tab.");
  },
});

function finish(message: string, code: number) {
  console.log(message);
  // Let the browser get its response before the server goes away.
  setTimeout(() => {
    server.stop();
    process.exit(code);
  }, 200);
}

console.log(`Waiting for Spotify on ${REDIRECT}`);
console.log(`If no browser opens, visit:\n${authorize}`);
spawn(
  process.platform === "darwin" ? "open" : "xdg-open",
  [authorize.toString()],
  {
    stdio: "ignore",
    detached: true,
  }
).on("error", () => {});

// A login nobody finishes shouldn't hold the port forever.
setTimeout(
  () => finish("Timed out after 5 minutes. Run it again.", 1),
  5 * 60_000
);
