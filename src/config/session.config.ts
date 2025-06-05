export const sessionName = process.env.SESSION_COOKIE_NAME ?? "session";
export const sessionCheckInterval = Number(process.env.SESSION_CHECK_INTERVAL || 1) * 60 * 1000;
export const sessionTokenMaxAge = `${process.env.SESSION_COOKIE_MAX_AGE || 90}d`;
export const sessionCookieMaxAge = Number(process.env.SESSION_COOKIE_MAX_AGE || 90) * 24 * 60 * 60 * 1000;
