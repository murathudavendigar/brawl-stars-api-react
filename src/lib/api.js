const GAME_TOKEN_RE = /<![^>]+>/g;
const VALID_HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export const cleanGameText = (value) => {
  if (!value) return "";
  return String(value)
    .replace(GAME_TOKEN_RE, "extra")
    .replace(/<\/?c[0-9A-Fa-f]*>/g, "")
    .replace(/\bextra s\b/gi, "extra")
    .replace(/\s+([%.])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,])/g, "$1")
    .trim();
};

export const sanitizeColor = (value, fallback = "#2186ff") => {
  if (typeof value !== "string") return fallback;
  const hex = value.trim();
  if (VALID_HEX_RE.test(hex)) return hex;

  const stripped = hex.replace(/[^#0-9a-fA-F]/g, "");
  if (VALID_HEX_RE.test(stripped)) return stripped;

  const match = hex.match(/#([0-9a-fA-F]{6})/);
  return match ? `#${match[1]}` : fallback;
};

export const getCatalogList = (data) =>
  Array.isArray(data?.list) ? data.list : [];

const normalizeAbility = (ability) => {
  if (!ability) return ability;
  return {
    ...ability,
    description: cleanGameText(ability.description),
  };
};

export const normalizeBrawler = (brawler) => {
  if (!brawler) return brawler;
  const rarityColor = sanitizeColor(brawler?.rarity?.color, "#b9eaff");

  return {
    ...brawler,
    description: cleanGameText(brawler.description),
    bgColor: rarityColor,
    rarity: brawler.rarity
      ? { ...brawler.rarity, color: rarityColor }
      : { id: 1, name: "Common", color: rarityColor },
    gadgets: (brawler.gadgets || []).map(normalizeAbility),
    starPowers: (brawler.starPowers || []).map(normalizeAbility),
  };
};

export const normalizeMap = (map) => {
  if (!map) return map;

  const gameMode = map.gameMode
    ? {
        ...map.gameMode,
        color: sanitizeColor(map.gameMode.color, "#2186ff"),
        bgColor: sanitizeColor(
          map.gameMode.bgColor,
          map.gameMode.color || "#2186ff"
        ),
      }
    : map.gameMode;

  const environmentName = map.environment?.name;
  const details = [
    gameMode?.name ? `${gameMode.name} map` : "Brawl Stars map",
    environmentName ? `Theme: ${environmentName}` : null,
    map.credit ? `Created by ${map.credit}` : null,
    map.disabled ? "Currently retired from rotation" : "Currently available",
  ].filter(Boolean);

  return {
    ...map,
    gameMode,
    description: details.join(". ") + ".",
  };
};

export const normalizeGameMode = (mode) => {
  if (!mode) return mode;
  const color = sanitizeColor(mode.color, "#d852ff");

  return {
    ...mode,
    color,
    bgColor: sanitizeColor(mode.bgColor, color),
    description: cleanGameText(
      mode.description || mode.tutorial || mode.shortDescription
    ),
  };
};

export const normalizeCatalog = (searchType, data) => {
  const list = getCatalogList(data);
  if (searchType === "brawlers") return list.map(normalizeBrawler);
  if (searchType === "maps") return list.map(normalizeMap);
  if (searchType === "gamemodes") return list.map(normalizeGameMode);
  return list;
};

export const hasLiveEvents = (data) =>
  Boolean(data?.active?.length || data?.upcoming?.length);

export const parseMapTimestamp = (value) => {
  if (value == null || value === "" || value === 0 || value === "0") return 0;
  if (typeof value === "number") {
    return value < 1e12 ? value * 1000 : value;
  }
  const parsed = Date.parse(String(value));
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const compareMapsByRecency = (a, b) => {
  const activeDiff =
    parseMapTimestamp(b?.lastActive) - parseMapTimestamp(a?.lastActive);
  if (activeDiff) return activeDiff;
  const newDiff = Number(Boolean(b?.new)) - Number(Boolean(a?.new));
  if (newDiff) return newDiff;
  return (Number(b?.id) || 0) - (Number(a?.id) || 0);
};

export const mapsForGameMode = (maps, mode) => {
  if (!mode || !Array.isArray(maps)) return [];
  const modeId = Number(mode.id);
  const modeName = mode.name?.toLowerCase();

  return maps.filter((map) => {
    const gameMode = map?.gameMode;
    if (!gameMode) return false;
    if (modeId && Number(gameMode.id) === modeId) return true;
    return Boolean(modeName && gameMode.name?.toLowerCase() === modeName);
  });
};
