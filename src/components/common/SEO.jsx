import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import {
  APP_INFO,
  DEFAULT_KEYWORDS,
  DEVELOPER,
  THEME_COLOR,
} from "../../lib/config";
import {
  buildJsonLd,
  canonicalUrl,
  DEFAULT_OG_IMAGE,
  metaDescription,
  toAbsoluteUrl,
} from "../../lib/seo";

const SEO = ({
  title,
  description,
  keywords,
  image,
  type = "website",
  noIndex = false,
  pageType = "WebPage",
  breadcrumbs,
}) => {
  const { pathname } = useLocation();
  const siteTitle = APP_INFO.NAME;
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription = metaDescription(description || APP_INFO.DESCRIPTION);
  const pageUrl = canonicalUrl(pathname);
  const pageImage = toAbsoluteUrl(image || DEFAULT_OG_IMAGE);
  const author = DEVELOPER.NAME;
  const robots = noIndex ? "noindex, follow" : "index, follow";
  const jsonLd = buildJsonLd({
    title: fullTitle,
    description: pageDescription,
    url: pageUrl,
    image: pageImage,
    breadcrumbs,
    pageType,
  });

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords || DEFAULT_KEYWORDS} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content={THEME_COLOR} />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={siteTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
      <meta name="twitter:creator" content="@murathoncu" />
      <meta name="twitter:site" content="@murathoncu" />

      <link rel="apple-touch-icon" href="/star-512x512.png" />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default SEO;
