import { Helmet } from "react-helmet-async";
import { APP_INFO, DEVELOPER } from "../../lib/config";

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
}) => {
  const siteTitle = APP_INFO.NAME;
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = APP_INFO.DESCRIPTION;
  const defaultImage = "/star-512x512.png";
  const author = DEVELOPER.NAME;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta
        name="keywords"
        content={
          keywords ||
          "Brawl Stars, Brawlers, Maps, Game Modes, Events, API, React"
        }
      />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:image" content={image || defaultImage} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={image || defaultImage} />
      <meta name="twitter:creator" content="@murathoncu" />

      {/* Theme Color */}
      <meta name="theme-color" content="#1a1a2e" />

      {/* Apple Touch Icon */}
      <link rel="apple-touch-icon" href="/star-512x512.png" />

      {/* Canonical URL */}
      {url && <link rel="canonical" href={url} />}
    </Helmet>
  );
};

export default SEO;
