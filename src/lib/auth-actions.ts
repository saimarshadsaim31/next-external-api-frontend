"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginSchema, RegisterSchema, type AuthResponse } from "@/types/auth";
import { apiRequest, ApiError } from "@/lib/api";

export type ActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function loginAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validatedData = LoginSchema.parse(rawData);

    const response = await apiRequest<AuthResponse>("/login", {
      method: "POST",
      body: JSON.stringify(validatedData),
    });

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("auth-token", response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Store user data in a separate cookie (not HTTP-only for client access)
    cookieStore.set("user-data", JSON.stringify(response.user), {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
      };
    }
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }

  redirect("/dashboard");
}

export async function registerAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      password_confirmation: formData.get("password_confirmation"),
    };

    const validatedData = RegisterSchema.parse(rawData);

    const response = await apiRequest<AuthResponse>("/register", {
      method: "POST",
      body: JSON.stringify(validatedData),
    });

    const cookieStore = await cookies();
    cookieStore.set("auth-token", response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookieStore.set("user-data", JSON.stringify(response.user), {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
      };
    }
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();

  try {
    // Call logout endpoint to invalidate token on server
    await apiRequest("/logout", {
      method: "POST",
      requiresAuth: true,
    });
  } catch {
    // Continue with logout even if server request fails
    // Silently handle the error since we want to logout regardless
  }

  // Clear cookies
  cookieStore.delete("auth-token");
  cookieStore.delete("user-data");

  redirect("/login");
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const userData = cookieStore.get("user-data")?.value;

    if (!userData) {
      return null;
    }

    return JSON.parse(userData);
  } catch {
    return null;
  }
}

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("auth-token")?.value || null;
}
