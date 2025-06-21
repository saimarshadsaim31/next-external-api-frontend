import { getAuthToken } from "@/lib/auth-actions";
import { apiRequest } from "@/lib/api";
import { ClientDataDemo } from "./client-data-demo";

async function getServerStats() {
  try {
    const data = await apiRequest<{
      totalUsers: number;
      activeUsers: number;
      totalRevenue: number;
    }>("/dashboard-stats", {
      requiresAuth: true,
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch server stats:", error);
    return null;
  }
}

export async function DataFetchingComparison() {
  const serverStats = await getServerStats();
  const token = await getAuthToken();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Server Component Data
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-blue-800 text-sm">
            This data is fetched on the server before the page renders
          </p>
        </div>
        {serverStats ? (
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-lg font-semibold">{serverStats.totalUsers}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-lg font-semibold">{serverStats.activeUsers}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-lg font-semibold">
                ${serverStats.totalRevenue?.toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-red-600">Failed to load server data</p>
        )}
      </div>

      <div>
        <ClientDataDemo token={token} />
      </div>
    </div>
  );
}
