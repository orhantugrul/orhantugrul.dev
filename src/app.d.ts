// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  /** The commit this build was made from, set in `vite.config.ts`. */
  const __COMMIT__: string;

  namespace App {
    interface Platform {
      env: Env;
      ctx: ExecutionContext;
      caches: CacheStorage;
      cf?: IncomingRequestCfProperties;
    }

    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
  }
}

export {};
