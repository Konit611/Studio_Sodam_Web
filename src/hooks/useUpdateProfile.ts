import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/lib/api/users";
import { queryKeys } from "@/lib/query/keys";
import type { UpdateProfileRequest, UserRead } from "@/types/user";

interface UseUpdateProfileOptions {
  userId: string;
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export function useUpdateProfile({
  userId,
  onSuccess,
  onError,
}: UseUpdateProfileOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      updateUserProfile(userId, data),
    onSuccess: (updatedUser: UserRead) => {
      queryClient.setQueryData(queryKeys.users.profile(userId), updatedUser);
      onSuccess();
    },
    onError,
  });
}
