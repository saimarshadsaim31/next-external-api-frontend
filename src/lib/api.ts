import { cookies } from "next/headers";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

export async function apiRequest<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { requiresAuth = false, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Merge existing headers
  if (fetchOptions.headers) {
    if (fetchOptions.headers instanceof Headers) {
      fetchOptions.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(fetchOptions.headers)) {
      fetchOptions.headers.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      Object.assign(headers, fetchOptions.headers);
    }
  }

  if (requiresAuth) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      throw new ApiError("No authentication token found", 401);
    }

    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || "An error occurred",
      response.status,
      errorData.errors
    );
  }

  return response.json();
}
