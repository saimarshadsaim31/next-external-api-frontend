import { getCurrentUser } from "@/lib/auth-actions";
import { apiRequest } from "@/lib/api";

interface ProtectedData {
  message: string;
  userId: number;
  timestamp: string;
  data: Array<{
    id: number;
    title: string;
    value: string;
  }>;
}

async function getServerData(): Promise<ProtectedData | null> {
  try {
    const data = await apiRequest<ProtectedData>("/protected-data", {
      requiresAuth: true,
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch server data:", error);
    return null;
  }
}

export default async function ServerComponentsPage() {
  const user = await getCurrentUser();
  const serverData = await getServerData();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Server Components Demo
        </h1>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            This page demonstrates Next.js 15 Server Components. All data is
            fetched on the server before the page is sent to the client.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Key Features:
            </h3>
            <ul className="text-blue-800 space-y-1">
              <li>• Data fetched on the server during build time</li>
              <li>• No client-side JavaScript needed for data fetching</li>
              <li>• Better SEO and initial page load performance</li>
              <li>• Direct database/API access without exposing credentials</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          User Data (Server-side)
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>

      {serverData ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Protected API Data (Server-side)
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
              {JSON.stringify(serverData, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Protected API Data (Server-side)
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">
              Failed to load server data. Please check your authentication.
            </p>
          </div>
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-green-800 text-sm">
          <strong>Implementation:</strong> This data was fetched using the
          `apiRequest` function directly in the server component, with
          authentication handled server-side using HTTP-only cookies.
        </p>
      </div>
    </div>
  );
}
