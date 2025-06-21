import { getCurrentUser } from "@/lib/auth-actions";
import { apiRequest } from "@/lib/api";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { ChartSection } from "@/components/dashboard/chart-section";

interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyGrowth: number;
  recentActivity: Array<{
    id: number;
    type: string;
    message: string;
    timestamp: string;
  }>;
  chartData: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
}

async function getDashboardData(): Promise<DashboardData | null> {
  try {
    const data = await apiRequest<DashboardData>("/dashboard-stats", {
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
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your dashboard today.
        </p>
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Server Component:</strong> This page is rendered on the
            server and data is fetched server-side using Next.js 15 server
            components.
          </p>
        </div>
      </div>

      {dashboardData ? (
        <>
          <StatsGrid stats={dashboardData} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity activities={dashboardData.recentActivity} />
            <ChartSection chartData={dashboardData.chartData} />
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Failed to load dashboard data.</p>
            <p className="text-sm text-gray-400">
              Please check your connection and try again.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
