import { useEffect, useState } from "react";
import { fetchGameCatalog } from "../lib/gameData";

const useGameCatalog = () => {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    fetchGameCatalog()
      .then((data) => {
        if (cancelled) return;
        setCatalog(data);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load game catalog"
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { catalog, loading, error };
};

export default useGameCatalog;
