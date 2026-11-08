import type { APIRoute } from "astro"

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("sitemap-index.xml", site)
  const robots = [
    "User-agent: *",
    "Allow: /",
    "",
    "User-agent: Googlebot",
    "Allow: /",
    "",
    "User-agent: bingbot",
    "Allow: /",
    "",
    "User-agent: Baiduspider",
    "Allow: /",
    "",
    "User-agent: yisouspider",
    "Allow: /",
    "",
    `Sitemap: ${sitemap.href}`,
  ].join("\n") + "\n"

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
