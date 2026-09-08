import {
  APP_INFO,
  DATA_SOURCES,
  DEFAULT_OG_IMAGE_PATH,
  DEVELOPER,
  SITE_URL,
} from "./config";

export const DEFAULT_OG_IMAGE = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`;

export const toAbsoluteUrl = (pathOrUrl) => {
  if (!pathOrUrl) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${path}`;
};

export const canonicalUrl = (pathname = "/") => {
  if (!pathname || pathname === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${pathname.replace(/\/+$/, "")}`;
};

export const metaDescription = (value, max = 160) => {
  const text = String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return APP_INFO.DESCRIPTION;
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
};

export const personSameAs = () => [
  DEVELOPER.PORTFOLIO,
  DEVELOPER.SOCIAL_LINKS.TWITTER,
  DEVELOPER.SOCIAL_LINKS.INSTAGRAM,
  DEVELOPER.SOCIAL_LINKS.LINKEDIN,
  DEVELOPER.SOCIAL_LINKS.GITHUB,
  "https://github.com/murathudavendigar/brawl-stars-api-react",
];

const personNode = () => ({
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: DEVELOPER.NAME,
  jobTitle: DEVELOPER.TITLE,
  url: DEVELOPER.PORTFOLIO,
  sameAs: personSameAs(),
});

export const buildJsonLd = ({
  title,
  description,
  url,
  image,
  breadcrumbs = [],
  pageType = "WebPage",
} = {}) => {
  const pageUrl = url || `${SITE_URL}/`;
  const pageTitle = title || APP_INFO.NAME;
  const pageDescription = description || APP_INFO.DESCRIPTION;
  const pageImage = toAbsoluteUrl(image);

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: APP_INFO.NAME,
      url: `${SITE_URL}/`,
      description: APP_INFO.DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#app`,
      name: APP_INFO.NAME,
      url: `${SITE_URL}/`,
      description: APP_INFO.DESCRIPTION,
      applicationCategory: "GameApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      creator: { "@id": `${SITE_URL}/#person` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
      featureList: [
        "Brawler catalog with rarity and class filters",
        "Map and game mode pages",
        "Favorites, random pick, and stat compare",
        "Available and retired map lists",
      ],
      about: [
        { "@type": "Thing", name: DATA_SOURCES.BRAWLAPI.name, url: DATA_SOURCES.BRAWLAPI.url },
        { "@type": "Thing", name: DATA_SOURCES.BRAWLIFY.name, url: DATA_SOURCES.BRAWLIFY.url },
      ],
    },
    personNode(),
    {
      "@type": pageType,
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#app` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: pageImage,
      },
      ...(pageType === "ProfilePage"
        ? { mainEntity: { "@id": `${SITE_URL}/#person` } }
        : {}),
    },
  ];

  if (breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: toAbsoluteUrl(crumb.path || pageUrl),
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};
