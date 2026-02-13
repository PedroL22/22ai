import { b as createMiddleware, a as clerkMiddleware } from "./clerkMiddleware-DADXeYtE.js";
import "@clerk/backend/internal";
import "@clerk/shared/netlifyCacheHandler";
import "@clerk/backend";
import "@clerk/shared/apiUrlFromPublishableKey";
import "@clerk/shared/getEnvVariable";
import "./env-CF34CcsW.js";
import "@clerk/shared/error";
import "@clerk/shared/underscore";
import "@clerk/shared/keys";
import "@clerk/shared/proxy";
import "@clerk/shared/utils";
function dedupeSerializationAdapters(deduped, serializationAdapters) {
  for (let i = 0, len = serializationAdapters.length; i < len; i++) {
    const current = serializationAdapters[i];
    if (!deduped.has(current)) {
      deduped.add(current);
      if (current.extends) {
        dedupeSerializationAdapters(deduped, current.extends);
      }
    }
  }
}
const createStart = (getOptions) => {
  return {
    getOptions: async () => {
      const options = await getOptions();
      if (options.serializationAdapters) {
        const deduped = /* @__PURE__ */ new Set();
        dedupeSerializationAdapters(
          deduped,
          options.serializationAdapters
        );
        options.serializationAdapters = Array.from(deduped);
      }
      return options;
    },
    createMiddleware
  };
};
const startInstance = createStart(() => {
  return {
    requestMiddleware: [clerkMiddleware()]
  };
});
export {
  startInstance
};
