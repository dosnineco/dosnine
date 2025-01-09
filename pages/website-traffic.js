"use client";

import { useEffect, useState } from "react";
import { supabase } from "lib/supabase";

const WebsiteTraffic = () => {
  const [pageViews, setPageViews] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    const fetchPageViews = async () => {
      // Fetch individual page views
      const { data: pages, error: pageError } = await supabase
        .from("page_views")
        .select("page_url, view_count, last_viewed")
        .order("view_count", { ascending: false });

      if (pageError) {
        console.error("Error fetching page views:", pageError);
      } else {
        setPageViews(pages);
        // Calculate total views
        const total = pages.reduce((sum, page) => sum + page.view_count, 0);
        setTotalViews(total);
      }

      // Fetch total views grouped by week
      const { data: weekly, error: weeklyError } = await supabase
        .rpc("get_weekly_views");

      if (weeklyError) {
        console.error("Error fetching weekly stats:", weeklyError);
      } else {
        setWeeklyStats(weekly);
      }
    };

    fetchPageViews();
  }, []);

  return (
    <div className="overflow-x-auto p-6 bg-white mt-4 rounded-lg shadow-md">
  <h2 className="text-lg font-semibold mb-5">Website Traffic Dashboard</h2>

      {/* Total Page Views */}
      <div className="p-4 mb-4 bg-green-100 text-green-800 rounded-lg text-center">
        <h1 className="text-xl font-bold">Total Page Views: {totalViews}</h1>
      </div>


      {/* Weekly Summary */}
      {/* <h3 className="text-md font-medium mb-2">Weekly Traffic Summary</h3>
      <table className="table-auto w-full text-left border-collapse border border-gray-200 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Week Starting</th>
            <th className="border border-gray-200 px-4 py-2">Total Views</th>
          </tr>
        </thead>
        <tbody>
          {weeklyStats.map((week) => (
            <tr key={week.week_start}>
              <td className="border border-gray-200 px-4 py-2">{week.week_start}</td>
              <td className="border border-gray-200 px-4 py-2">{week.total_views}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* Page Views */}
      <h3 className="text-md font-medium mb-2">Page View Details</h3>
      <table className="table-auto w-full text-left border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Page URL</th>
            <th className="border border-gray-200 px-4 py-2">View Count</th>
            <th className="border border-gray-200 px-4 py-2">Last Viewed</th>
          </tr>
        </thead>
        <tbody>
          {pageViews.map((view) => (
            <tr key={view.page_url}>
                <td className=" border border-gray-200 px-4 py-2 max-w-xs truncate ">{view.page_url}</td>
                <td className="border border-gray-200 px-4 py-2 max-w-xs">{view.view_count}</td>
              <td className="border border-gray-200 px-4 py-2 max-w-xs">
                {new Date(view.last_viewed).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WebsiteTraffic;
