"use client";

import { useEffect, useState } from "react";
import { supabase } from "lib/supabase";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const WebsiteTraffic = () => {
  const [pageViews, setPageViews] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [mostViewed, setMostViewed] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchPageViews = async () => {
      try {
        const { data: pages, error: pageError } = await supabase
          .from("page_views")
          .select("page_url, view_count, last_viewed")
          .order("view_count", { ascending: false });

        if (pageError) throw pageError;

        const uniquePages = Array.from(
          new Map(pages.map((item) => [item.page_url, item])).values()
        );
        setPageViews(uniquePages);

        const total = uniquePages.reduce((sum, page) => sum + page.view_count, 0);
        setTotalViews(total);
        setMostViewed(uniquePages[0]);

        const { data: weekly, error: weeklyError } = await supabase.rpc("get_weekly_views");
        if (weeklyError) throw weeklyError;
        setWeeklyStats(weekly);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPageViews();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredPageViews = pageViews.filter((view) => {
    const matchesSearch = view.page_url.toLowerCase().includes(searchTerm);
    if (filter === "fbclid") {
      return matchesSearch && view.page_url.includes("fbclid");
    }
    if (filter === "no-fbclid") {
      return matchesSearch && !view.page_url.includes("fbclid");
    }
    return matchesSearch;
  });

  const chartData = {
    labels: filteredPageViews.map((view) => view.page_url),
    datasets: [
      {
        label: "Page Views",
        data: filteredPageViews.map((view) => view.view_count),
        backgroundColor: "rgba(0, 141, 228, 0.6)",
      },
    ],
  };

  return (
    <div className=" border rounded-md overflow-x-auto p-6 bg-white mt-4 rounded-lg ">
      <h2 className="text-lg font-semibold mb-5">Website Traffic Dashboard</h2>

      {/* Total Page Views */}
      <div className="p-4 mb-4  text-green-800 rounded-lg text-center">
        <span className="text-xl font-bold">Total Page Views: {totalViews}</span>
      </div>

      {/* Search and Filter */}
      <div className="flex mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by URL"
          className="p-2 border rounded-md w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="p-2 border rounded-md"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="fbclid">External Links (fbclid)</option>
          <option value="no-fbclid">Internal Links</option>
        </select>
      </div>

     

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
          {filteredPageViews.map((view) => (
            <tr key={view.page_url}>
              <td className="border border-gray-200 px-4 py-2 max-w-xs truncate">{view.page_url}</td>
              <td className="border border-gray-200 px-4 py-2">{view.view_count}</td>
              <td className="border border-gray-200 px-4 py-2">
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
