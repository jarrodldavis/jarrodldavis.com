declare module "webpack" {
  interface Hook<Args, Ret> {
    tapPromise(name: string, fn: (...args: Args) => Promise<Ret>): void;
  }

  type ResolveStepHook = Hook<[ResolveRequest, ResolveContext], ResolveRequest | undefined>;

  interface ResolveRequest {
    path: string | false;
    relativePath?: string;
    request: string;
  }

  const __context: unique symbol;

  interface ResolveContext {
    [__context]: never;
  }

  export interface Resolver {
    ensureHook(hook: string): ResolveStepHook;

    doResolve(
      hook: ResolveStepHook,
      request: ResolveRequest,
      message: null | string,
      resolveContext: ResolveContext,
      callback: (err?: null | Error, result?: ResolveRequest) => void,
    ): void;
  }

  export type ResolvePluginInstance =
    | {
        apply(resolver: Resolver);
      }
    | ((this: Resolver, resolver: Resolver) => void);
}
