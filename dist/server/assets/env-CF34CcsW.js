import { buildErrorThrower } from "@clerk/shared/error";
import { getEnvVariable } from "@clerk/shared/getEnvVariable";
import { isTruthy } from "@clerk/shared/underscore";
var isClient = () => typeof window !== "undefined";
var errorThrower = buildErrorThrower({
  packageName: "@clerk/tanstack-react-start"
});
var getPublicEnvVariables = () => {
  const getValue = (name) => {
    return getEnvVariable(`VITE_${name}`) || getEnvVariable(name);
  };
  return {
    publishableKey: getValue("CLERK_PUBLISHABLE_KEY"),
    domain: getValue("CLERK_DOMAIN"),
    isSatellite: isTruthy(getValue("CLERK_IS_SATELLITE")),
    proxyUrl: getValue("CLERK_PROXY_URL"),
    signInUrl: getValue("CLERK_SIGN_IN_URL"),
    signUpUrl: getValue("CLERK_SIGN_UP_URL"),
    clerkJsUrl: getValue("CLERK_JS_URL") || getValue("CLERK_JS"),
    clerkJsVariant: getValue("CLERK_JS_VARIANT"),
    clerkJsVersion: getValue("CLERK_JS_VERSION"),
    telemetryDisabled: isTruthy(getValue("CLERK_TELEMETRY_DISABLED")),
    telemetryDebug: isTruthy(getValue("CLERK_TELEMETRY_DEBUG")),
    afterSignInUrl: getValue("CLERK_AFTER_SIGN_IN_URL"),
    afterSignUpUrl: getValue("CLERK_AFTER_SIGN_UP_URL"),
    newSubscriptionRedirectUrl: getValue("CLERK_CHECKOUT_CONTINUE_URL")
  };
};
export {
  errorThrower as e,
  getPublicEnvVariables as g,
  isClient as i
};
