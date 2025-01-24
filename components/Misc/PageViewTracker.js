"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "lib/supabase";

const PageViewTracker = () => {
  const router = useRouter();

  useEffect(() => {
    const handlePageView = async (url) => {
      if (!url) return;

      try {
        // Check if the page already exists in the database
        const { data, error } = await supabase
          .from("page_views")
          .select("view_count")
          .eq("page_url", url)
          .single();

        if (error) {
          if (error.code === "PGRST116") {
            // Insert a new record if it doesn't exist
            const { error: insertError } = await supabase
              .from("page_views")
              .insert({ page_url: url, view_count: 1 });

            if (insertError) {
              console.error("Error inserting new page view record:", insertError);
            }
          } else {
            console.error("Error fetching page view data:", error);
          }
        } else if (data) {
          // Increment the view count for an existing record
          const { error: updateError } = await supabase
            .from("page_views")
            .update({ view_count: data.view_count + 1 })
            .eq("page_url", url);

          if (updateError) {
            console.error("Error updating page view record:", updateError);
          }
        }
      } catch (err) {
        console.error("Unexpected error in handlePageView:", err);
      }
    };

    // Track initial page view
    handlePageView(router.asPath);

    // Listen for route changes and track page views
    const handleRouteChange = (url) => handlePageView(url);
    router.events.on("routeChangeComplete", handleRouteChange);

    // Cleanup listener on unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return null; // This component does not render any UI
};

export default PageViewTracker;
