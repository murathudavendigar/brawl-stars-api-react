import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

const MAX_ITEMS = 8;

const useRecentlyViewed = () => {
  const [items, setItems] = useLocalStorage("brawl-stars-recent", []);

  const pushRecent = useCallback(
    (entry) => {
      if (!entry?.id || !entry?.type) return;
      setItems((current) => {
        const list = Array.isArray(current) ? current : [];
        const nextEntry = {
          id: entry.id,
          type: entry.type,
          name: entry.name,
          imageUrl: entry.imageUrl,
          path: entry.path,
        };
        const withoutDup = list.filter(
          (item) => !(item.id === entry.id && item.type === entry.type)
        );
        const next = [nextEntry, ...withoutDup].slice(0, MAX_ITEMS);
        const same =
          next.length === list.length &&
          next.every(
            (item, index) =>
              item.id === list[index]?.id && item.type === list[index]?.type
          );
        return same ? current : next;
      });
    },
    [setItems]
  );

  const clearRecent = useCallback(() => setItems([]), [setItems]);

  return {
    recentItems: Array.isArray(items) ? items : [],
    pushRecent,
    clearRecent,
  };
};

export default useRecentlyViewed;
