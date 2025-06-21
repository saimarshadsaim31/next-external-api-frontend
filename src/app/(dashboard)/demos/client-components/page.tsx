import { getAuthToken } from "@/lib/auth-actions";
import { ClientDataDemo } from "@/components/demos/client-data-demo";

export default async function ClientComponentsPage() {
  const token = await getAuthToken();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Client Components Demo
        </h1>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            This page demonstrates Next.js 15 Client Components with client-side
            data fetching.
          </p>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              Key Features:
            </h3>
            <ul className="text-purple-800 space-y-1">
              <li>• Interactive components with state management</li>
              <li>• Client-side data fetching with loading states</li>
              <li>• Real-time updates and user interactions</li>
              <li>• Error handling and retry mechanisms</li>
            </ul>
          </div>
        </div>
      </div>

      <ClientDataDemo token={token} />
    </div>
  );
}
