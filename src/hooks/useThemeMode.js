import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useThemeMode = () => {
  const [themeMode, setThemeMode] = useLocalStorage(
    "brawl-stars-theme",
    "arena"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);

  const cycleThemeMode = () => {
    setThemeMode((currentMode) => {
      if (currentMode === "arena") return "classic";
      if (currentMode === "classic") return "neon";
      return "arena";
    });
  };

  return { themeMode, cycleThemeMode };
};

export default useThemeMode;
