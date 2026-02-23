import { env } from "@/env";

const BASE_URL = `${env.NEXT_PUBLIC_API_URL}/api/v1`;
const DEFAULT_TIMEOUT_MS = 30_000;

class ApiClientError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

function sanitizeErrorMessage(message: string): string {
  return message
    .replace(/\/[\w/.-]+/g, "[path]")
    .replace(/token[=:]\s*\S+/gi, "token=[redacted]")
    .substring(0, 200);
}

function getDefaultErrorMessage(status: number): string {
  if (status === 400) return "입력값을 확인해주세요";
  if (status === 404) return "요청한 항목을 찾을 수 없습니다";
  if (status >= 500) return "잠시 후 다시 시도해주세요";
  return "요청을 처리할 수 없습니다";
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = getDefaultErrorMessage(response.status);
    try {
      const body = await response.json();
      if (body.detail && typeof body.detail === "string") {
        message = sanitizeErrorMessage(body.detail);
      }
    } catch {
      // Use default message
    }
    throw new ApiClientError(response.status, message);
  }
  return response.json() as Promise<T>;
}

function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { ...init, signal: controller.signal }).finally(() => {
    clearTimeout(timeoutId);
  });
}

function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError && error.message === "Failed to fetch")
    return true;
  if (error instanceof DOMException && error.name === "AbortError") return true;
  return false;
}

export function getErrorMessage(error: unknown): string {
  if (isNetworkError(error)) return "네트워크 연결을 확인해주세요";
  if (error instanceof ApiClientError) return error.message;
  return "알 수 없는 오류가 발생했습니다";
}

export async function get<T>(path: string): Promise<T> {
  const response = await fetchWithTimeout(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse<T>(response);
}

export async function post<T>(path: string, body: unknown): Promise<T> {
  const response = await fetchWithTimeout(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}

export async function patch<T>(path: string, body: unknown): Promise<T> {
  const response = await fetchWithTimeout(`${BASE_URL}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}

export async function del<T>(path: string): Promise<T> {
  const response = await fetchWithTimeout(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse<T>(response);
}

export { ApiClientError };
