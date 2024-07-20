import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupedServices, setGroupedServices] = useState([]);

  useEffect(() => {
    const fetchPosts = async (perPage) => {
      let url = `https://findhealthcare.com/wp-json/wp/v2/service?per_page=${perPage}`;
      try {
        const response = await axios.get(url);
        const data = response.data.map((item) => ({
          ...item,
          name: item.name.replace(/&amp;/g, "&"),
        }));
        setServices(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(100);
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      const headings = services.filter((item) => item.parent === 0);
      const grouped = headings.map((heading) => ({
        heading,
        items: services.filter((item) => item.parent === heading.id),
      }));
      setGroupedServices(grouped);
    }
  }, [services]);

  console.log("grouped services list", groupedServices);

  return (
    <ServicesContext.Provider value={{ services, groupedServices, loading }}>
      {children}
    </ServicesContext.Provider>
  );
};
