const { promisify } = require("util");

/**
 * @import { Resolver, ResolvePluginInstance } from 'webpack'
 */

/**
 * @implements {Exclude<ResolvePluginInstance, Function>}
 */
class VcfPngResolverPlugin {
  /**
   * @param {Resolver} resolver
   */
  apply(resolver) {
    const target = resolver.ensureHook("resolve");

    target.tapPromise("VcfPngResolverPlugin", async (request, resolveContext) => {
      if (!request.request?.endsWith(".vcf.png")) {
        return;
      }

      const resolve = promisify(resolver.doResolve).bind(resolver);

      const pngRequest = {
        ...request,
        request: request.request.replace(/\.png$/, ""),
      };

      const result = await resolve(target, pngRequest, null, resolveContext);

      if (!result) {
        return;
      }

      result.path += ".png";

      if (request.relativePath) {
        result.relativePath = ".png";
      }

      return result;
    });
  }
}

module.exports = VcfPngResolverPlugin;