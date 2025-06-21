import { getCurrentUser, getAuthToken } from "@/lib/auth-actions";
import { apiRequest } from "@/lib/api";
import { LogoutButton } from "@/components/logout-button";

// Example: Fetch dashboard data on the server
async function getDashboardData() {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error("No token found");
    }

    // Replace with your actual API endpoints
    const data = await apiRequest("/dashboard-stats", {
      requiresAuth: true,
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return null;
  }
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const dashboardData = await getDashboardData();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <span className="text-gray-700">Welcome, {user.name}</span>
              )}
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            {dashboardData ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">Dashboard Data</h2>
                <pre className="bg-gray-100 p-4 rounded">
                  {JSON.stringify(dashboardData, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-gray-500">Loading dashboard data...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
