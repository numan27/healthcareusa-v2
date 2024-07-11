import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GroupedListingsContext = createContext();

export const GroupedListingsProvider = ({ children }) => {
  const [groupedListings, setGroupedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "https://jsappone.demowp.io/wp-json/wp/v2/service?per_page=100"
        );
        const data = response.data.map((item) => ({
          ...item,
          name: item.name.replace(/&amp;/g, "&"),
        }));
        const headings = data.filter((item) => item.parent === 0);
        const grouped = headings.map((heading) => ({
          heading,
          items: data.filter((item) => item.parent === heading.id),
        }));
        setGroupedListings(grouped);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <GroupedListingsContext.Provider value={{ groupedListings, loading }}>
      {children}
    </GroupedListingsContext.Provider>
  );
};
