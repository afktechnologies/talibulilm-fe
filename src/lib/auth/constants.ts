export const ACCESS_TOKEN_COOKIE = "tlm_access_token";
export const REFRESH_TOKEN_COOKIE = "tlm_refresh_token";
export const USER_COOKIE = "tlm_user";

/** Matches backend `JWT_ACCESS_EXPIRATION` default (15m), see talibulilm-be/.env.example. */
export const ACCESS_TOKEN_MAX_AGE = 15 * 60;
/**
 * Matches backend `JWT_REFRESH_EXPIRATION` default (30d) — public frontend
 * accounts (`Role.USER`) get a 30-day session with automatic silent
 * refresh, unlike the admin panel's deliberately short 1-day one.
 */
export const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60;

export const LOGIN_PATH = "/auth/login";
export const REGISTER_PATH = "/auth/register";
export const DEFAULT_REDIRECT_PATH = "/";
