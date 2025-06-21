"use client";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

interface ChartSectionProps {
  chartData: ChartData;
}

export function ChartSection({ chartData }: ChartSectionProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Performance Overview
      </h3>
      <div className="space-y-4">
        {chartData.datasets.map((dataset, index) => (
          <div key={dataset.label}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                {dataset.label}
              </span>
              <span className="text-sm text-gray-500">
                Max: {Math.max(...dataset.data).toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {dataset.data.map((value, i) => (
                <div key={i} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">
                    {chartData.labels[i]}
                  </div>
                  <div
                    className={`h-16 rounded ${
                      index === 0 ? "bg-blue-200" : "bg-green-200"
                    } flex items-end justify-center`}
                    style={{
                      height: `${(value / Math.max(...dataset.data)) * 64}px`,
                      minHeight: "8px",
                    }}
                  >
                    <span className="text-xs font-medium text-gray-700 mb-1">
                      {value.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>Note:</strong> This is a simple chart representation. In a
          real app, you&apos;d use a proper charting library like Chart.js or
          Recharts.
        </p>
      </div>
    </div>
  );
}
