"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { loginAction, type ActionState } from "@/lib/auth-actions";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const initialState: ActionState = {
  success: false,
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <form action={formAction} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="john@example.com"
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          {state.errors?.email && (
            <p className="mt-2 text-sm text-red-600">{state.errors.email[0]}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder="••••••••"
              className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {state.errors?.password && (
            <p className="mt-2 text-sm text-red-600">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {state.message && !state.success && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {state.message}
          </div>
        )}

        <Button
          type="submit"
          disabled={pending}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          {pending ? "Signing in..." : "Sign In"}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 font-medium mb-2">
            Demo Credentials:
          </p>
          <p className="text-xs text-gray-500">Email: john@example.com</p>
          <p className="text-xs text-gray-500">Password: password123</p>
        </div>
      </form>
    </div>
  );
}
