"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "lib/supabase";

const PageViewTracker = () => {
  const router = useRouter();

  useEffect(() => {
    const handlePageView = async (url) => {
      // Check if the page already exists in the database
      const { data, error } = await supabase
        .from("page_views")
        .select("view_count")
        .eq("page_url", url)
        .single();

      if (error && error.code === "PGRST116") {
        // If no record exists, insert a new one
        const { error: insertError } = await supabase
          .from("page_views")
          .insert({ page_url: url, view_count: 1 });

        if (insertError) {
          console.error("Error inserting page view:", insertError);
        }
      } else if (data) {
        // If record exists, increment the view count
        const { error: updateError } = await supabase
          .from("page_views")
          .update({ view_count: data.view_count + 1 })
          .eq("page_url", url);

        if (updateError) {
          console.error("Error updating page view:", updateError);
        }
      }
    };

    // Track page view when the route changes
    handlePageView(router.asPath);

    // Listen for route changes
    const handleRouteChange = (url) => handlePageView(url);
    router.events.on("routeChangeComplete", handleRouteChange);

    // Cleanup event listener on unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return null; // This component does not render anything
};

export default PageViewTracker;
