"use client";

import { AuthContext } from "./context";
import { isDevMode, getDevUserId } from "./dev-user";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dev mode: use hardcoded mock user ID from env for local development.
  // Production: user identity is resolved by the backend via HTTP-only session/JWT cookie.
  // The frontend passes userId to API paths (e.g., /users/{id}), but the backend MUST
  // independently verify the authenticated user from the request context.
  // When real auth is implemented (e.g., NextAuth), replace this provider to extract
  // the actual user ID from the session.
  if (!isDevMode() && typeof window !== "undefined") {
    console.warn(
      "[AuthProvider] Running without dev mode. Ensure backend authenticates requests via session/JWT.",
    );
  }

  const userId = isDevMode() ? getDevUserId() : "";

  return <AuthContext value={{ userId }}>{children}</AuthContext>;
}
