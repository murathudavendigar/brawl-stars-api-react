// API Configuration
export const API_CONFIG = {
  BASE_URL: "https://api.brawlapi.com/v1",
};

// API Endpoints
export const ENDPOINTS = {
  BRAWLERS: `${API_CONFIG.BASE_URL}/brawlers`,
  BRAWLER: (id) => `${API_CONFIG.BASE_URL}/brawlers/${id}`,
  MAPS: `${API_CONFIG.BASE_URL}/maps`,
  MAP: (id) => `${API_CONFIG.BASE_URL}/maps/${id}`,
  GAME_MODES: `${API_CONFIG.BASE_URL}/gamemodes`,
  GAME_MODE: (id) => `${API_CONFIG.BASE_URL}/gamemodes/${id}`,
  EVENTS: `${API_CONFIG.BASE_URL}/events`,
  GAME: "https://api.brawlapi.com/game",
  CHARACTERS: "https://api.brawlapi.com/game/csv_logic/characters",
  SKILLS: "https://api.brawlapi.com/game/csv_logic/skills",
  CLASS_ARCHETYPES: "https://api.brawlapi.com/game/csv_logic/class_archetypes",
  SKINS: "https://api.brawlapi.com/game/csv_logic/skins",
  GEARS: "https://api.brawlapi.com/game/csv_logic/gear_boosts",
  ICONS: "https://api.brawlapi.com/v1/icons",
};

export const getCatalogUrl = (searchType) => {
  if (searchType === "brawlers") return ENDPOINTS.BRAWLERS;
  if (searchType === "maps") return ENDPOINTS.MAPS;
  return ENDPOINTS.GAME_MODES;
};

// Developer Information
export const DEVELOPER = {
  NAME: "Murat Hudavendigar Oncu",
  DISPLAY_NAME: "John Price",
  TITLE: "Frontend Developer",
  BIO: "Frontend developer focused on React and performant UI. This Starr Park catalog is a personal project for browsing Brawl Stars data.",
  PORTFOLIO: "https://muratoncu.com",
  SOCIAL_LINKS: {
    TWITTER: "https://twitter.com/murathoncu",
    INSTAGRAM: "https://www.instagram.com/mhdvoncu/",
    LINKEDIN: "https://www.linkedin.com/in/murathudavendigaroncu/",
    GITHUB: "https://github.com/murathudavendigar",
  },
  SKILLS: [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "styled-components",
    "Next.js",
    "REST APIs",
    "Git",
  ],
};

// App Information
export const APP_INFO = {
  NAME: "Brawl Stars API",
  VERSION: "2.0.0",
  DESCRIPTION:
    "Browse Brawl Stars brawlers, maps, and game modes with filters, favorites, and side-by-side compare.",
  SUMMARY:
    "Brawl Stars API is a free browser catalog for exploring Brawl Stars brawlers, maps, and game modes. Catalogs come from BrawlAPI. Portraits and profile icons come from the Brawlify CDN. On Home you can filter brawlers by rarity and class, sort newest first, save favorites, pick a random brawler, and compare HP, speed, and attack. Map and game-mode pages include retired maps. Events splits maps into Available and Retired because BrawlAPI does not publish a live rotation clock. The app does not look up player tags or battle logs. Use Home, Events, and About in the navbar, and switch Arena, Classic, or Neon theme skins. JavaScript is required for the interactive catalog. It is a personal React project by Murat Hudavendigar Oncu and is not affiliated with Supercell.",
};

export const SITE_URL = "https://brawl-stars-api-react.vercel.app";
export const THEME_COLOR = "#F01919";
export const DEFAULT_OG_IMAGE_PATH = "/star-512x512.png";
export const DEFAULT_KEYWORDS =
  "Brawl Stars, Brawlers, Maps, Game Modes, Events, BrawlAPI, React";

export const DATA_SOURCES = {
  BRAWLAPI: {
    name: "BrawlAPI",
    url: "https://brawlapi.com",
  },
  BRAWLIFY: {
    name: "Brawlify",
    url: "https://brawlify.com",
  },
};

// Search Types with Labels
export const SEARCH_TYPES = {
  BRAWLERS: {
    value: "brawlers",
    label: "Brawlers",
    loadingMessage: "Loading brawlers",
  },
  MAPS: {
    value: "maps",
    label: "Maps",
    loadingMessage: "Loading maps",
  },
  GAME_MODES: {
    value: "gamemodes",
    label: "Game Modes",
    loadingMessage: "Loading game modes",
  },
};

// Get loading message by search type
export const getLoadingMessage = (searchType) => {
  const type = Object.values(SEARCH_TYPES).find((t) => t.value === searchType);
  return type?.loadingMessage || "Loading";
};

// Navigation Links
export const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/events", label: "Events" },
  { path: "/about", label: "About" },
];

// Default config export for backwards compatibility
const config = {};

export default config;
