import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { sitemapStaticPaths, sitemapXML } from "@/lib/sitemap";

describe("Site sitemap", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("includes all seven public pages and excludes private and service pages", () => {
    expect(sitemapStaticPaths(router)).toEqual([
      "/", "/about", "/careers", "/contacts", "/courses", "/prices", "/teachers",
    ]);
  });

  it("uses the published origin without inventing modification dates", () => {
    const xml = sitemapXML("https://moscow-english-compass.lovable.app", sitemapStaticPaths(router).map((path) => ({ path })));
    const document = new DOMParser().parseFromString(xml, "application/xml");
    expect(document.querySelector("parsererror")).toBeNull();
    expect(Array.from(document.getElementsByTagName("loc"), (node) => node.textContent)).toEqual([
      "https://moscow-english-compass.lovable.app/",
      "https://moscow-english-compass.lovable.app/about",
      "https://moscow-english-compass.lovable.app/careers",
      "https://moscow-english-compass.lovable.app/contacts",
      "https://moscow-english-compass.lovable.app/courses",
      "https://moscow-english-compass.lovable.app/prices",
      "https://moscow-english-compass.lovable.app/teachers",
    ]);
    expect(document.getElementsByTagName("lastmod").length).toBe(0);
  });
});