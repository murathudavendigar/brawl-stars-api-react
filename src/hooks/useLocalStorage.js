import { useEffect, useState } from "react";

const getStoredValue = (key, fallbackValue) => {
  if (typeof window === "undefined") return fallbackValue;

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  } catch (error) {
    return fallbackValue;
  }
};

const useLocalStorage = (key, fallbackValue) => {
  const [value, setValue] = useState(() => getStoredValue(key, fallbackValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Local storage can be unavailable in private browsing or strict settings.
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
