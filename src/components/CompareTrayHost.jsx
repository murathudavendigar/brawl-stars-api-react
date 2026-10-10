import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCompare from "../hooks/useCompare";
import useFetch from "../hooks/useFetch";
import useGameCatalog from "../hooks/useGameCatalog";
import { normalizeCatalog } from "../lib/api";
import { ENDPOINTS } from "../lib/config";
import { enrichBrawler } from "../lib/gameData";
import CompareTray from "./CompareTray";

const CompareTrayHost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    selectedCompareIds,
    clearCompare,
    maxCompare,
    sharePath,
  } = useCompare();
  const { data } = useFetch(ENDPOINTS.BRAWLERS);
  const { catalog } = useGameCatalog();

  const names = useMemo(() => {
    const list = normalizeCatalog("brawlers", data).map((brawler) =>
      enrichBrawler(brawler, catalog)
    );
    return selectedCompareIds
      .map((id) =>
        list.find((item) => item.id === id || String(item.id) === String(id))
      )
      .filter(Boolean)
      .map((item) => item.name);
  }, [catalog, data, selectedCompareIds]);

  if (!selectedCompareIds.length) return null;
  if (location.pathname.startsWith("/about")) return null;

  return (
    <CompareTray
      count={selectedCompareIds.length}
      maxCompare={maxCompare}
      names={names}
      sharePath={sharePath}
      onClear={clearCompare}
      onJump={() => {
        if (location.pathname === "/") {
          document
            .getElementById("compare-panel")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        navigate(sharePath);
      }}
    />
  );
};

export default CompareTrayHost;
