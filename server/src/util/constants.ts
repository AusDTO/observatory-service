require("dotenv").config();
var cfenv = require("cfenv");
let appEnv: any;

export const ENVIRONMENT = process.env.NODE_ENV;
export const FRONT_END_URL =
  ENVIRONMENT !== "production"
    ? "http://localhost:3000"
    : "https://observatory-app.apps.y.cld.gov.au";

export const CORS_OPTIONS =
  ENVIRONMENT === "production" ? false : FRONT_END_URL;

export const RESOLVER_FILE_TYPE = ENVIRONMENT === "production" ? "js" : "ts";
export const REDIS_PREFIX = "sess:";
export const USER_SESSION_PREFIX = "userSessionID:";

export const REDIS_FORGOT_PASSWORD_PREFIX = "forgotPassword:";
export const REDIS_CONFIRMATION_EMAIL_PREFIX = "confirmEmail:";

export const basicApiErrorMessage = (message: string, path: string) => ({
  __typename: "Error",
  message,
  path,
});

export const basicApiMessage = (__typename: string, message: string) => ({
  __typename,
  message,
});

if (ENVIRONMENT == "production") {
  appEnv = cfenv.getAppEnv();
}

const notify_key = () => {
  if (ENVIRONMENT === "test") {
    return process.env.NOTIFY_TEST_KEY;
  }
  if (ENVIRONMENT === "development") return process.env.NOTIFY_DEV_KEY;
  if (ENVIRONMENT === "production")
    return appEnv.services["user-provided"][0].credentials.NOTIFY_LIVE_KEY;
};

export const NOTIFY_KEY = notify_key();