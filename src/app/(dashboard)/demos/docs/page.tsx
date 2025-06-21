export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Next.js 15 Authentication Demo
        </h1>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Features Demonstrated
          </h2>

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                🔐 Authentication
              </h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>JWT token-based authentication</li>
                <li>HTTP-only cookies for secure token storage</li>
                <li>Server actions for login/register/logout</li>
                <li>Middleware for route protection</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                🏗️ Next.js 15 Features
              </h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Server Components for server-side data fetching</li>
                <li>Client Components for interactive features</li>
                <li>Server Actions with useActionState hook</li>
                <li>Route groups for organized file structure</li>
                <li>Middleware for authentication</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                📊 Data Fetching
              </h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Server-side API calls with authentication</li>
                <li>Client-side fetching with loading states</li>
                <li>Error handling and retry mechanisms</li>
                <li>Type-safe API responses with TypeScript</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                🎨 Styling & UX
              </h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Tailwind CSS for responsive design</li>
                <li>Shadcn/ui components</li>
                <li>Loading states and error handling</li>
                <li>Form validation with Zod</li>
              </ul>
            </section>
          </div>

          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              🚀 Getting Started
            </h3>
            <ol className="list-decimal pl-6 space-y-1 text-green-800">
              <li>
                Start the backend server:{" "}
                <code className="bg-green-100 px-2 py-1 rounded">
                  cd backend && npm run dev
                </code>
              </li>
              <li>
                Start the frontend:{" "}
                <code className="bg-green-100 px-2 py-1 rounded">
                  cd frontend && npm run dev
                </code>
              </li>
              <li>Login with: john@example.com / password123</li>
              <li>Explore the different demo pages</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
