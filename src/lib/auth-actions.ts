"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginSchema, RegisterSchema, type AuthResponse } from "@/types/auth";
import { apiRequest, ApiError } from "@/lib/api";
import { z } from "zod";

export type ActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  formData?: Record<string, string>;
};

export async function loginAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
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
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path[0] as string;
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });
      return {
        success: false,
        message: "Validation failed",
        errors,
        formData: {
          email: (formData.get("email") as string) || "",
          password: (formData.get("password") as string) || "",
        },
      };
    }
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
        formData: {
          email: (formData.get("email") as string) || "",
          password: (formData.get("password") as string) || "",
        },
      };
    }
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        formData: {
          email: (formData.get("email") as string) || "",
          password: (formData.get("password") as string) || "",
        },
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred",
      formData: {
        email: (formData.get("email") as string) || "",
        password: (formData.get("password") as string) || "",
      },
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
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      password_confirmation: formData.get("password_confirmation") as string,
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
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path[0] as string;
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });
      return {
        success: false,
        message: "Validation failed",
        errors,
        formData: {
          name: (formData.get("name") as string) || "",
          email: (formData.get("email") as string) || "",
          password: (formData.get("password") as string) || "",
          password_confirmation:
            (formData.get("password_confirmation") as string) || "",
        },
      };
    }
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
        formData: {
          name: (formData.get("name") as string) || "",
          email: (formData.get("email") as string) || "",
          password: (formData.get("password") as string) || "",
          password_confirmation:
            (formData.get("password_confirmation") as string) || "",
        },
      };
    }
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        formData: {
          name: (formData.get("name") as string) || "",
          email: (formData.get("email") as string) || "",
          password: (formData.get("password") as string) || "",
          password_confirmation:
            (formData.get("password_confirmation") as string) || "",
        },
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred",
      formData: {
        name: (formData.get("name") as string) || "",
        email: (formData.get("email") as string) || "",
        password: (formData.get("password") as string) || "",
        password_confirmation:
          (formData.get("password_confirmation") as string) || "",
      },
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
