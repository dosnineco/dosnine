"use client";

import { useEffect, useState } from "react";
import { supabase } from "lib/supabase";

const WebsiteTraffic = () => {
  const [pageViews, setPageViews] = useState([]);
  const [timeFrame, setTimeFrame] = useState("week"); // Default to weekly stats
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPageViews = async () => {
      setIsLoading(true);

      if (timeFrame === "day") {
        // Fetch daily stats
        const { data, error } = await supabase.rpc("get_daily_views");
        if (error) {
          console.error("Error fetching daily stats:", error);
        } else {
          setPageViews(data);
        }
      } else if (timeFrame === "week") {
        // Fetch weekly stats
        const { data, error } = await supabase.rpc("get_weekly_views");
        if (error) {
          console.error("Error fetching weekly stats:", error);
        } else {
          setPageViews(data);
        }
      } else if (timeFrame === "month") {
        // Fetch monthly stats
        const { data, error } = await supabase.rpc("get_monthly_views");
        if (error) {
          console.error("Error fetching monthly stats:", error);
        } else {
          setPageViews(data);
        }
      }

      setIsLoading(false);
    };

    fetchPageViews();
  }, [timeFrame]);

  // Calculate the total view count
  const totalViews = pageViews.reduce((total, view) => total + view.view_count, 0);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Website Traffic Dashboard</h2>

      <div className="mb-4 flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            timeFrame === "day" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTimeFrame("day")}
        >
          Daily
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeFrame === "week" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTimeFrame("week")}
        >
          Weekly
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeFrame === "month" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTimeFrame("month")}
        >
          Monthly
        </button>
      </div>

      <div className="mb-4">
        <p className="text-lg font-semibold">
          Total Views: <span className="text-green-500">{totalViews}</span>
        </p>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Page URL</th>
              <th className="border border-gray-200 px-4 py-2">View Count</th>
            </tr>
          </thead>
          <tbody>
            {pageViews.map((view, index) => (
              <tr key={index}>
                <td className="border border-gray-200 px-4 py-2">{view.page_url}</td>
                <td className="border border-gray-200 px-4 py-2">{view.view_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WebsiteTraffic;
