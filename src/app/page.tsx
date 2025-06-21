import Link from "next/link";
import { getCurrentUser } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Dashboard</h1>
        {user ? (
          <div>
            <p className="mb-4">Hello, {user.name}!</p>
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        ) : (
          <div className="space-x-4">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
