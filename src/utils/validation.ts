const ALLOWED_CHARS = /^[가-힣a-zA-Z0-9\s\-_(),./]+$/;

export function isValidIngredient(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= 50 && ALLOWED_CHARS.test(trimmed);
}

export function isValidAllergy(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= 30 && ALLOWED_CHARS.test(trimmed);
}
