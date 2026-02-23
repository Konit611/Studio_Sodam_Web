export const queryKeys = {
  recipes: {
    all: ["recipes"] as const,
    list: (offset: number, limit: number) =>
      ["recipes", "list", offset, limit] as const,
    detail: (id: string) => ["recipes", "detail", id] as const,
  },
  users: {
    profile: (userId: string) => ["users", "profile", userId] as const,
  },
} as const;
