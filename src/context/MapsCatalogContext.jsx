import { createContext, useContext, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { normalizeCatalog } from "../lib/api";
import { ENDPOINTS } from "../lib/config";

const MapsCatalogContext = createContext({
  maps: [],
  loading: true,
  error: null,
  refetch: () => {},
  isValidating: false,
});

export const MapsCatalogProvider = ({ children }) => {
  const { data, loading, error, refetch, isValidating } = useFetch(
    ENDPOINTS.MAPS,
    { swr: true }
  );

  const maps = useMemo(
    () => normalizeCatalog("maps", data),
    [data]
  );

  const value = useMemo(
    () => ({ maps, loading, error, refetch, isValidating }),
    [error, isValidating, loading, maps, refetch]
  );

  return (
    <MapsCatalogContext.Provider value={value}>
      {children}
    </MapsCatalogContext.Provider>
  );
};

export const useMapsCatalog = () => useContext(MapsCatalogContext);

export default MapsCatalogContext;
