import { APP_INFO, SITE_URL } from "./config";
import {
  buildJsonLd,
  canonicalUrl,
  DEFAULT_OG_IMAGE,
  metaDescription,
  toAbsoluteUrl,
} from "./seo";

describe("seo helpers", () => {
  it("builds production canonical URLs without trailing slashes", () => {
    expect(canonicalUrl("/")).toBe(`${SITE_URL}/`);
    expect(canonicalUrl("/about")).toBe(`${SITE_URL}/about`);
    expect(canonicalUrl("/events/")).toBe(`${SITE_URL}/events`);
  });

  it("turns relative image paths into absolute URLs", () => {
    expect(toAbsoluteUrl("/star-512x512.png")).toBe(DEFAULT_OG_IMAGE);
    expect(toAbsoluteUrl("https://cdn.example/a.png")).toBe(
      "https://cdn.example/a.png"
    );
  });

  it("keeps meta descriptions short and HTML-free", () => {
    expect(metaDescription("<p>Shelly is a starter brawler.</p>")).toBe(
      "Shelly is a starter brawler."
    );
    expect(metaDescription("x".repeat(200)).length).toBe(160);
    expect(metaDescription("")).toBe(APP_INFO.DESCRIPTION);
  });

  it("emits WebSite, WebApplication, and Person JSON-LD", () => {
    const data = buildJsonLd({
      title: "About",
      description: APP_INFO.DESCRIPTION,
      url: `${SITE_URL}/about`,
      pageType: "ProfilePage",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ],
    });
    const types = data["@graph"].map((node) => node["@type"]);

    expect(data["@context"]).toBe("https://schema.org");
    expect(types).toEqual(
      expect.arrayContaining([
        "WebSite",
        "WebApplication",
        "Person",
        "ProfilePage",
        "BreadcrumbList",
      ])
    );
  });
});
