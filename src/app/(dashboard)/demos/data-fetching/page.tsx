import { DataFetchingComparison } from "@/components/demos/data-fetching-comparison";

export default function DataFetchingPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Data Fetching Patterns
        </h1>
        <p className="text-gray-600 mb-6">
          Compare different data fetching approaches in Next.js 15
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Server Components
            </h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Fetch data at build time</li>
              <li>• Better for SEO</li>
              <li>• No client-side loading</li>
              <li>• Direct database access</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              Client Components
            </h3>
            <ul className="text-purple-800 text-sm space-y-1">
              <li>• Fetch data on user interaction</li>
              <li>• Real-time updates</li>
              <li>• Loading states</li>
              <li>• Interactive features</li>
            </ul>
          </div>
        </div>
      </div>

      <DataFetchingComparison />
    </div>
  );
}
