import useLocalStorage from "./useLocalStorage";

const getFavoriteKey = (type, id) => `${type}:${id}`;

const useFavorites = () => {
  const [favoriteKeys, setFavoriteKeys] = useLocalStorage(
    "brawl-stars-favorites",
    []
  );

  const isFavorite = (type, id) => favoriteKeys.includes(getFavoriteKey(type, id));

  const toggleFavorite = (type, id) => {
    const key = getFavoriteKey(type, id);
    setFavoriteKeys((currentKeys) =>
      currentKeys.includes(key)
        ? currentKeys.filter((item) => item !== key)
        : [...currentKeys, key]
    );
  };

  return { favoriteKeys, isFavorite, toggleFavorite };
};

export default useFavorites;
