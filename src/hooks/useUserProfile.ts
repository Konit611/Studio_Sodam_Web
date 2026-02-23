import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/lib/api/users";
import { queryKeys } from "@/lib/query/keys";

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: queryKeys.users.profile(userId),
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
  });
}
