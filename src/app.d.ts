declare global {
  /** The commit this build was made from, set in `vite.config.ts`. */
  const __COMMIT__: string;
  /** When that commit was made (ISO), or empty when git could not say. */
  const __COMMITTED__: string;

  namespace App {
    interface Platform {
      env: Env;
      ctx: ExecutionContext;
      caches: CacheStorage;
      cf?: IncomingRequestCfProperties;
    }
  }
}

export {};
