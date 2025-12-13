// API Configuration
export const API_CONFIG = {
  BRAWLIFY_BASE_URL: "https://api.brawlify.com/v1",
  BRAWL_STARS_BASE_URL: "https://api.brawlstars.com/v1",
  BRAWLIFY_ICON_URL: "https://cdn-old.brawlify.com/profile",
  TOKEN: process.env.REACT_APP_TOKEN,
};

// API Endpoints
export const ENDPOINTS = {
  BRAWLERS: `${API_CONFIG.BRAWLIFY_BASE_URL}/brawlers`,
  MAPS: `${API_CONFIG.BRAWLIFY_BASE_URL}/maps`,
  GAME_MODES: `${API_CONFIG.BRAWLIFY_BASE_URL}/gamemodes`,
  EVENTS: `${API_CONFIG.BRAWLIFY_BASE_URL}/events`,
};

// Developer Information
export const DEVELOPER = {
  NAME: "Murat Hudavendigar Oncu",
  DISPLAY_NAME: "John Price",
  TITLE: "Frontend Developer",
  BIO: "Passionate about creating beautiful and performant web applications. Specialized in React, TypeScript, and modern frontend technologies.",
  PORTFOLIO: "https://murathudavendigar.vercel.app",
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
  DESCRIPTION: "A React app to explore Brawl Stars brawlers, maps, and events",
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
const config = {
  TOKEN: API_CONFIG.TOKEN,
};

export default config;
