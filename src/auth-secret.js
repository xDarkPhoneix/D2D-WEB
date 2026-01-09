const DEFAULT_AUTH_SECRET = "dev-secret-change-me";

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? DEFAULT_AUTH_SECRET;
