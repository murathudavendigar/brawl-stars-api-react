import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Custom hook for data fetching with loading and error states
 * @param {string} url - The URL to fetch data from
 * @param {object} options - Optional axios config options
 * @returns {object} - { data, loading, error, refetch }
 */
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use ref to avoid options causing re-fetches
  const optionsRef = useRef(options);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios(url, optionsRef.current);
      setData(response.data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetch;
