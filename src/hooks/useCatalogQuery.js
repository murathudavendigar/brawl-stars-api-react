import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULTS = {
  type: "brawlers",
  q: "",
  rarity: "all",
  class: "all",
  gameMode: "all",
  availability: "available",
  sort: "newest",
  view: "grid",
  fav: false,
};

const VALID_TYPES = new Set(["brawlers", "maps", "gamemodes"]);
const VALID_VIEWS = new Set(["grid", "compact"]);

const readBool = (value) => value === "1" || value === "true";

const useCatalogQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo(() => {
    const type = searchParams.get("type");
    const view = searchParams.get("view");
    const sortParam = searchParams.get("sort");
    const resolvedType = VALID_TYPES.has(type) ? type : DEFAULTS.type;
    const defaultSort = resolvedType === "brawlers" ? "newest" : "name-asc";

    return {
      searchType: resolvedType,
      searchName: searchParams.get("q") || DEFAULTS.q,
      filters: {
        rarity: searchParams.get("rarity") || DEFAULTS.rarity,
        class: searchParams.get("class") || DEFAULTS.class,
        gameMode: searchParams.get("gameMode") || DEFAULTS.gameMode,
        availability: searchParams.get("availability") || DEFAULTS.availability,
      },
      sortBy: sortParam || defaultSort,
      viewMode: VALID_VIEWS.has(view) ? view : DEFAULTS.view,
      showFavorites: readBool(searchParams.get("fav")),
    };
  }, [searchParams]);

  const patchQuery = useCallback(
    (updates) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          const apply = (key, value, defaultValue) => {
            if (value == null || value === "" || value === defaultValue) {
              next.delete(key);
              return;
            }
            next.set(key, String(value));
          };

          if ("searchType" in updates) {
            apply("type", updates.searchType, DEFAULTS.type);
            if (updates.searchType !== "brawlers") {
              next.delete("rarity");
              next.delete("class");
            }
            if (updates.searchType !== "maps") {
              next.delete("gameMode");
              next.delete("availability");
            }
          }
          if ("searchName" in updates) apply("q", updates.searchName, DEFAULTS.q);
          if ("sortBy" in updates) {
            const type = updates.searchType || next.get("type") || DEFAULTS.type;
            const defaultSort = type === "brawlers" ? "newest" : "name-asc";
            apply("sort", updates.sortBy, defaultSort);
          }
          if ("viewMode" in updates) apply("view", updates.viewMode, DEFAULTS.view);
          if ("showFavorites" in updates) {
            apply("fav", updates.showFavorites ? "1" : "", "");
          }
          if ("filters" in updates && updates.filters) {
            const filters = updates.filters;
            if ("rarity" in filters) apply("rarity", filters.rarity, DEFAULTS.rarity);
            if ("class" in filters) apply("class", filters.class, DEFAULTS.class);
            if ("gameMode" in filters) {
              apply("gameMode", filters.gameMode, DEFAULTS.gameMode);
            }
            if ("availability" in filters) {
              apply("availability", filters.availability, DEFAULTS.availability);
            }
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams();
        const type = current.get("type");
        if (type && type !== DEFAULTS.type) next.set("type", type);
        return next;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  return { ...state, patchQuery, resetFilters };
};

export default useCatalogQuery;
