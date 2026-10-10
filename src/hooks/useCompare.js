import { useCallback, useEffect, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

const MAX_COMPARE = 2;
const STORAGE_KEY = "brawl-stars-compare";

const parseCompareParam = (value) => {
  if (!value) return [];
  return value
    .split(",")
    .map((part) => {
      const asNumber = Number(part);
      return Number.isNaN(asNumber) ? part : asNumber;
    })
    .filter((id) => id !== "" && id != null)
    .slice(0, MAX_COMPARE);
};

const serializeCompare = (ids) =>
  ids.length ? ids.map(String).join(",") : "";

const isCompareRoute = (pathname) =>
  pathname === "/" || pathname.startsWith("/brawlers");

const useCompare = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedIds, setStoredIds] = useLocalStorage(STORAGE_KEY, []);
  const onCompareRoute = isCompareRoute(location.pathname);

  const urlIds = useMemo(
    () => parseCompareParam(searchParams.get("compare")),
    [searchParams]
  );

  const selectedCompareIds = useMemo(() => {
    if (onCompareRoute && urlIds.length) return urlIds;
    return Array.isArray(storedIds) ? storedIds.slice(0, MAX_COMPARE) : [];
  }, [onCompareRoute, storedIds, urlIds]);

  const writeIds = useCallback(
    (nextIds) => {
      const normalized = (Array.isArray(nextIds) ? nextIds : []).slice(
        0,
        MAX_COMPARE
      );
      setStoredIds(normalized);

      if (!onCompareRoute) return;

      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          const serialized = serializeCompare(normalized);
          if (serialized) next.set("compare", serialized);
          else next.delete("compare");
          return next;
        },
        { replace: true }
      );
    },
    [onCompareRoute, setSearchParams, setStoredIds]
  );

  useEffect(() => {
    if (!onCompareRoute) return;
    if (searchParams.get("compare")) return;
    if (!Array.isArray(storedIds) || !storedIds.length) return;
    setSearchParams(
      (current) => {
        if (current.get("compare")) return current;
        const next = new URLSearchParams(current);
        next.set("compare", serializeCompare(storedIds.slice(0, MAX_COMPARE)));
        return next;
      },
      { replace: true }
    );
  }, [onCompareRoute, searchParams, setSearchParams, storedIds]);

  const toggleCompare = useCallback(
    (item) => {
      const ids = selectedCompareIds;
      const exists = ids.some(
        (id) => id === item.id || String(id) === String(item.id)
      );
      writeIds(
        exists
          ? ids.filter(
              (id) => id !== item.id && String(id) !== String(item.id)
            )
          : [...ids.slice(-(MAX_COMPARE - 1)), item.id]
      );
    },
    [selectedCompareIds, writeIds]
  );

  const clearCompare = useCallback(() => writeIds([]), [writeIds]);

  const isComparing = useCallback(
    (id) =>
      selectedCompareIds.some(
        (entry) => entry === id || String(entry) === String(id)
      ),
    [selectedCompareIds]
  );

  const sharePath = useMemo(() => {
    if (!selectedCompareIds.length) return "/?type=brawlers";
    const params = new URLSearchParams();
    params.set("type", "brawlers");
    params.set("compare", serializeCompare(selectedCompareIds));
    return `/?${params.toString()}`;
  }, [selectedCompareIds]);

  return {
    selectedCompareIds,
    toggleCompare,
    clearCompare,
    isComparing,
    maxCompare: MAX_COMPARE,
    sharePath,
  };
};

export default useCompare;
