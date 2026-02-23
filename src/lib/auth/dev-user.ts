import { env } from "@/env";

export function isDevMode(): boolean {
  return env.NEXT_PUBLIC_DEV_MODE === "true";
}

export function getDevUserId(): string {
  return env.NEXT_PUBLIC_DEV_USER_ID ?? "dev-user-001";
}
