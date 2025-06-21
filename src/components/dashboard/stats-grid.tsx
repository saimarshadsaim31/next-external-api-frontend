import { Users, TrendingUp, DollarSign, Activity } from "lucide-react";

interface StatsGridProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalRevenue: number;
    monthlyGrowth: number;
  };
}

export function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    {
      name: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      name: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      icon: Activity,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      name: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      name: "Monthly Growth",
      value: `${stats.monthlyGrowth}%`,
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.name}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <div className={`${item.bg} p-3 rounded-lg`}>
                <Icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{item.name}</p>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
