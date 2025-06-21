"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { clientApiRequest } from "@/lib/client-api";
import { RefreshCw, AlertCircle } from "lucide-react";

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

interface ClientDataDemoProps {
  token: string | null;
}

export function ClientDataDemo({ token }: ClientDataDemoProps) {
  const [data, setData] = useState<ProtectedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!token) {
      setError("No authentication token available");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await clientApiRequest<ProtectedData>("/protected-data", {
        token,
      });
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Client-side Data Fetching
        </h2>
        <Button
          onClick={fetchData}
          disabled={loading}
          variant="outline"
          size="sm"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          {loading ? "Loading..." : "Refresh"}
        </Button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Fetching data...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {data && !loading && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-purple-800 text-sm">
          <strong>Implementation:</strong> This data is fetched client-side
          using React hooks and the `clientApiRequest` function, with loading
          states and error handling. The token is passed from the server
          component.
        </p>
      </div>
    </div>
  );
}
