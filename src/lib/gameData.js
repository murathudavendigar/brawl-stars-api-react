import { ENDPOINTS } from "./config";

export const CLASS_LABELS = {
  tank: "Tank",
  assassin: "Assassin",
  support: "Support",
  controller: "Controller",
  damage_dealer: "Damage Dealer",
  marksman: "Marksman",
  artillery: "Artillery",
};

export const GEAR_IMAGE_URL = (id) =>
  `https://cdn.brawlify.com/gears/regular/${id}.png`;

export const PROFILE_ICON_URL = (id) =>
  `https://cdn.brawlify.com/profile-icons/regular/${id}.png`;

const EMPTY_STATS = {
  hitpoints: null,
  speed: null,
  attackDamage: null,
  attackRange: null,
  ammo: null,
  reloadMs: null,
  superDamage: null,
};

const asValues = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === "object") return Object.values(data);
  return [];
};

const asNamedMap = (data) => {
  if (!data) return {};
  if (Array.isArray(data)) {
    return Object.fromEntries(
      data.filter((row) => row?.Name).map((row) => [row.Name, row])
    );
  }
  if (typeof data === "object") return data;
  return {};
};

export const humanizeIdentifier = (value) => {
  if (value == null || value === "") return "";
  return String(value)
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getClassLabel = (archetype) => {
  if (!archetype) return null;
  const key = String(archetype).toLowerCase();
  return CLASS_LABELS[key] || humanizeIdentifier(archetype);
};

export const STAT_MAX = {
  hitpoints: 12000,
  speed: 1000,
  attackDamage: 4000,
  attackRange: 40,
  reloadMs: 2500,
  superDamage: 5000,
};

export const CLASS_COLORS = {
  "Damage Dealer": "#F01919",
  Tank: "#68FD58",
  Marksman: "#5EFFFF",
  Assassin: "#d850ff",
  Support: "#FFB921",
  Controller: "#5ab3ff",
  Artillery: "#f88f25",
};

export const statPercent = (value, max) => {
  if (value == null || max <= 0) return 0;
  return Math.max(4, Math.min(100, Math.round((Number(value) / max) * 100)));
};

export const formatReload = (ms) => {
  if (ms == null || ms === "" || Number.isNaN(Number(ms))) return "-";
  const seconds = Number(ms) / 1000;
  if (seconds === 0) return "0s";
  const rounded = Number.isInteger(seconds)
    ? String(seconds)
    : seconds.toFixed(1).replace(/\.0$/, "");
  return `${rounded}s`;
};

const uniquePrefixes = (character) => {
  const prefixes = [];
  if (character?.Name) prefixes.push(character.Name);
  if (character?.DefaultSkin) {
    prefixes.push(character.DefaultSkin);
    const base = String(character.DefaultSkin).replace(/Default$/, "");
    if (base && base !== character.DefaultSkin) prefixes.push(base);
  }
  return [...new Set(prefixes.filter(Boolean))];
};

const formatSkinName = (skin, characterName, prefixes) => {
  const raw = skin?.Name || skin?.Conf || "";
  let display = raw;
  const sorted = [...prefixes].sort((a, b) => b.length - a.length);
  for (const prefix of sorted) {
    if (display.startsWith(prefix)) {
      display = display.slice(prefix.length);
      break;
    }
  }
  if (!display || /^default$/i.test(display)) return "Default";
  return humanizeIdentifier(display) || characterName || raw;
};

const heroListForGear = (extra) => {
  if (extra == null || extra === "" || extra === false) return null;
  if (Array.isArray(extra)) return extra.filter(Boolean);
  return [extra];
};

const normalizeSkin = (skin, characterName, prefixes) => ({
  id: skin.id,
  name: formatSkinName(skin, characterName, prefixes),
  rawName: skin.Name || "",
  rarity: skin.Rarity ? humanizeIdentifier(skin.Rarity) : null,
  priceGems: skin.PriceGems || 0,
  priceCoins: skin.PriceCoins || 0,
  priceBling: skin.PriceBling || 0,
  imageUrl: null,
});

const withDefaultSkinPortrait = (skins, portraitUrl) => {
  if (!Array.isArray(skins) || !portraitUrl) return skins || [];
  return skins.map((skin) =>
    skin?.name === "Default" && !skin.imageUrl
      ? { ...skin, imageUrl: portraitUrl }
      : skin
  );
};

const normalizeGear = (gear) => ({
  id: gear.id,
  name: humanizeIdentifier(gear.Name) || gear.Name,
  rawName: gear.Name || "",
  rarity: gear.Rarity ? humanizeIdentifier(gear.Rarity) : null,
  imageUrl: gear.id != null ? GEAR_IMAGE_URL(gear.id) : null,
});

export const buildCatalog = ({
  characters,
  skills,
  classArchetypes,
  skins,
  gears,
  icons,
} = {}) => {
  const charactersById = new Map();
  const charactersByName = new Map();
  const heroPrefixes = [];

  asValues(characters).forEach((character) => {
    if (!character || character.Type !== "Hero" || character.id == null) return;
    charactersById.set(character.id, character);
    if (character.Name) charactersByName.set(character.Name, character);
    uniquePrefixes(character).forEach((prefix) => {
      heroPrefixes.push({ prefix, characterName: character.Name });
    });
  });

  heroPrefixes.sort((a, b) => b.prefix.length - a.prefix.length);

  const skinsByCharacterName = new Map();
  charactersByName.forEach((_, name) => {
    skinsByCharacterName.set(name, []);
  });

  asValues(skins).forEach((skin) => {
    const skinName = skin?.Name || "";
    const conf = skin?.Conf || "";
    if (/buddy|gadget|turret/i.test(`${skinName} ${conf}`)) return;
    const match = heroPrefixes.find(
      ({ prefix }) => skinName.startsWith(prefix) || conf.startsWith(prefix)
    );
    if (!match) return;
    const character = charactersByName.get(match.characterName);
    const prefixes = uniquePrefixes(character || { Name: match.characterName });
    const list = skinsByCharacterName.get(match.characterName) || [];
    list.push(normalizeSkin(skin, match.characterName, prefixes));
    skinsByCharacterName.set(match.characterName, list);
  });

  const genericGears = [];
  const gearsByHeroName = new Map();

  asValues(gears).forEach((gear) => {
    const normalized = normalizeGear(gear);
    const heroes = heroListForGear(gear.ExtraHerosAvailableTo);
    if (!heroes) {
      genericGears.push(normalized);
      return;
    }
    heroes.forEach((heroName) => {
      const list = gearsByHeroName.get(heroName) || [];
      list.push(normalized);
      gearsByHeroName.set(heroName, list);
    });
  });

  const iconsByBrawlerId = new Map();
  asValues(icons?.player).forEach((icon) => {
    if (icon?.brawler == null) return;
    const existing = iconsByBrawlerId.get(icon.brawler);
    if (!existing || (icon.sortOrder ?? 0) < (existing.sortOrder ?? 0)) {
      iconsByBrawlerId.set(icon.brawler, {
        ...icon,
        imageUrl:
          icon.imageUrl ||
          (icon.id != null ? PROFILE_ICON_URL(icon.id) : null),
      });
    }
  });

  return {
    charactersById,
    skillsByName: asNamedMap(skills),
    classArchetypes: asNamedMap(classArchetypes),
    skinsByCharacterName,
    genericGears,
    gearsByHeroName,
    iconsByBrawlerId,
  };
};

let catalogPromise = null;

const loadCatalog = async () => {
  const axios = (await import("axios")).default;
  const [
    charactersResponse,
    skillsResponse,
    classArchetypesResponse,
    skinsResponse,
    gearsResponse,
    iconsResponse,
  ] = await Promise.all([
    axios.get(ENDPOINTS.CHARACTERS),
    axios.get(ENDPOINTS.SKILLS),
    axios.get(ENDPOINTS.CLASS_ARCHETYPES),
    axios.get(ENDPOINTS.SKINS),
    axios.get(ENDPOINTS.GEARS),
    axios.get(ENDPOINTS.ICONS),
  ]);

  return buildCatalog({
    characters: charactersResponse.data,
    skills: skillsResponse.data,
    classArchetypes: classArchetypesResponse.data,
    skins: skinsResponse.data,
    gears: gearsResponse.data,
    icons: iconsResponse.data,
  });
};

export const fetchGameCatalog = () => {
  if (!catalogPromise) {
    catalogPromise = loadCatalog().catch((error) => {
      catalogPromise = null;
      throw error;
    });
  }
  return catalogPromise;
};

export const enrichBrawler = (brawler, catalog) => {
  if (!brawler) return brawler;

  const playstyle = brawler.playstyle || brawler.class?.name || null;
  const icon =
    catalog?.iconsByBrawlerId?.get(brawler.id) ||
    catalog?.iconsByBrawlerId?.get(Number(brawler.id));
  const iconUrl = brawler.iconUrl || icon?.imageUrl || null;
  const imageUrl =
    brawler.imageUrl || brawler.imageUrl2 || iconUrl || null;

  if (!catalog) {
    return {
      ...brawler,
      className: brawler.className || null,
      playstyle,
      stats: brawler.stats || { ...EMPTY_STATS },
      iconUrl,
      imageUrl,
      imageUrlFallback: iconUrl,
      skins: withDefaultSkinPortrait(brawler.skins || [], imageUrl),
      gears: brawler.gears || [],
    };
  }

  const character =
    catalog.charactersById.get(brawler.id) ||
    catalog.charactersById.get(Number(brawler.id));

  if (!character) {
    return {
      ...brawler,
      className: brawler.className || null,
      playstyle,
      stats: brawler.stats || { ...EMPTY_STATS },
      iconUrl,
      imageUrl,
      imageUrlFallback: iconUrl,
      skins: withDefaultSkinPortrait(brawler.skins || [], imageUrl),
      gears: brawler.gears || [],
    };
  }

  const weapon = catalog.skillsByName[character.WeaponSkill] || null;
  const ultimate = catalog.skillsByName[character.UltimateSkill] || null;
  const specificGears = catalog.gearsByHeroName.get(character.Name) || [];

  return {
    ...brawler,
    imageUrl,
    className: getClassLabel(character.ClassArchetype),
    playstyle,
    stats: {
      hitpoints: character.Hitpoints ?? null,
      speed: character.Speed ?? null,
      attackDamage: weapon?.Damage ?? null,
      attackRange: weapon?.CastingRange ?? null,
      ammo: weapon?.MaxCharge ?? null,
      reloadMs: weapon?.RechargeTime ?? null,
      superDamage: ultimate?.Damage ?? null,
    },
    iconUrl,
    imageUrlFallback: iconUrl,
    skins: withDefaultSkinPortrait(
      catalog.skinsByCharacterName.get(character.Name) || [],
      imageUrl
    ),
    gears: [...catalog.genericGears, ...specificGears],
  };
};
