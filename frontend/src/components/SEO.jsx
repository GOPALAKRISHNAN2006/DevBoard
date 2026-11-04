import { Helmet } from "react-helmet-async";

const SITE_NAME = "DevBoard";
const DEFAULT_DOMAIN = "https://dev-board-mauve.vercel.app";
const DEFAULT_IMAGE = `${DEFAULT_DOMAIN}/og-image.png`;
const DEFAULT_IMAGE_WIDTH = "1200";
const DEFAULT_IMAGE_HEIGHT = "630";

/**
 * Strips tracking query parameters from URLs to ensure clean canonicalization
 */
function cleanCanonicalUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url, DEFAULT_DOMAIN);
    // Remove common marketing/tracking query parameters
    const trackingParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "ref",
      "fbclid",
      "gclid",
      "_ga",
    ];
    trackingParams.forEach((param) => parsed.searchParams.delete(param));
    // If no search params remain, strip the query string completely
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    // Fallback if URL parsing fails
    return url.split("?")[0];
  }
}

/**
 * Reusable SEO and Social Graph Metadata Component
 * 
 * @param {Object} props
 * @param {string} props.title - Full page title tag
 * @param {string} props.description - Meta description
 * @param {string} [props.canonical] - Absolute canonical URL (only for indexable public pages)
 * @param {string} [props.robots="noindex, nofollow"] - Robots indexing directive
 * @param {string} [props.ogType="website"] - Open Graph type (e.g., website, profile, article)
 * @param {string} [props.image] - Custom Open Graph and Twitter card image URL
 * @param {Object|Array} [props.structuredData] - Schema.org JSON-LD object or array
 */
export default function SEO({
  title,
  description,
  canonical = null,
  robots = "noindex, nofollow",
  ogType = "website",
  image = DEFAULT_IMAGE,
  structuredData = null,
}) {
  const sanitizedCanonical = cleanCanonicalUrl(canonical);
  const pageTitle = title ? `${title}` : SITE_NAME;
  const pageUrl = sanitizedCanonical || DEFAULT_DOMAIN;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content={robots} />

      {/* Canonical Link - Only injected when canonical URL is explicitly provided */}
      {sanitizedCanonical && <link rel="canonical" href={sanitizedCanonical} />}

      {/* Open Graph Metadata */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={pageTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={DEFAULT_IMAGE_WIDTH} />
      <meta property="og:image:height" content={DEFAULT_IMAGE_HEIGHT} />

      {/* Twitter / X Card Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {/* Schema.org JSON-LD Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

