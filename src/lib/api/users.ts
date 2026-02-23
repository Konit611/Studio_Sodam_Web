import type { UserRead, UpdateProfileRequest } from "@/types/user";
import { get, patch } from "./client";

export function fetchUserProfile(userId: string): Promise<UserRead> {
  return get<UserRead>(`/users/${encodeURIComponent(userId)}`);
}

export function updateUserProfile(
  userId: string,
  data: UpdateProfileRequest,
): Promise<UserRead> {
  return patch<UserRead>(`/users/${encodeURIComponent(userId)}`, data);
}
