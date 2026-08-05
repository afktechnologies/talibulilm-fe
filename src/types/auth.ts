/** Mirrors talibulilm-be `src/auth/entities/user.entity.ts` `Role` enum. */
export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
  USER = "USER",
}

export interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName?: string;
  role: Role;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}

/** Shared shape returned by both `/auth/login` and `/auth/register` (registration logs the user in). */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}
