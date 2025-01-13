"use client";

import { useEffect, useState } from "react";
import { supabase } from "lib/supabase";

const WebsiteTraffic = () => {
  const [pageViews, setPageViews] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPageViews = async () => {
      try {
        const { data: pages, error: pageError } = await supabase
          .from("page_views")
          .select("page_url, view_count, last_viewed ")
          .order("view_count", { ascending: false });

        if (pageError) throw pageError;

        const uniquePages = Array.from(
          new Map(pages.map((item) => [item.page_url, item])).values()
        );
        setPageViews(uniquePages);

        const total = uniquePages.reduce((sum, page) => sum + page.view_count, 0);
        setTotalViews(total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPageViews();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredPageViews = pageViews.filter((view) => {
    const matchesSearch = view.page_url.toLowerCase().includes(searchTerm);
    // Exclude URLs containing 'fbclid'
    return matchesSearch && !view.page_url.includes("fbclid");
  });

  return (
    <div className="text-inherit border rounded-md overflow-x-auto p-6 bg-white mt-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-5">Website Traffic Dashboard</h2>

      {/* Total Page Views */}
      <div className="p-4 mb-4 text-green-800 rounded-lg text-center">
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
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPageViews.map((view) => (
            <tr key={view.page_url}>
              <td className="w-32 px-4 py-3 truncate text-nowrap text-sm text-inherit font-medium">
                {view.page_url}
              </td>
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
