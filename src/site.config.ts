import type {
  FooterConfig,
  LinkConfig,
  ProfileConfig,
  PublicationConfig,
  SiteConfig,
} from "@/types"

export const SITE: SiteConfig = {
  title: "机场推荐",
  description:
    "2026专业翻墙机场推荐与评测导航。收录全网42家主流机场，涵盖IEPL专线、IPLC内网专线与高性价比中转梯子，提供晚高峰测速实测、ChatGPT/流媒体解锁报告与客户端下载教程。",
  href: "https://jichangtuijian.click",
  author: "机场推荐测评实验室",
  dir: "ltr",
  defaultPageImage: "/img/social-preview.png",
  defaultPostImage: "/img/social-preview.png",

  locale: {
    lang: "zh-CN",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Shanghai",
    },
  },

  tocMaxDepth: 3,

  blog: {
    featuredPostCount: 6,
    postsPerPage: 12,
    shareActions: ["x"],
  },

  home: {
    careerHighlightCount: 0,
    updateCount: 5,
    publicationCount: 0,
  },

  favicon: "/favicon.ico",
  prerender: true,
  npmCDN: "https://jichangtuijian.click",

  license: {
    label: "CC-BY-4.0",
    href: "https://creativecommons.org/licenses/by/4.0/",
  },
}

export const PROFILE: ProfileConfig = {
  name: SITE.title,
  tagline: "2026 全球高速翻墙机场实测与专线选型指南",
  email: "contact@jichangtuijian.click",
  location: "亚太与全球专线节点实测",
  pronouns: "权威实测 / 拒绝虚标",
  links: {
    website: "https://jichangtuijian.click",
  },
  highlightLinks: ["website"],
  linksPlacement: {
    header: [],
    about: false,
    footer: false,
  },
}

export const NAV_LINKS: LinkConfig[] = [
  { href: "/ranking", label: "机场排行" },
  { href: "/brands", label: "42家品牌库" },
  { href: "/reviews", label: "深度测评" },
  { href: "/free-trial", label: "免费试用" },
  { href: "/scam-warning", label: "跑路预警" },
  { href: "/free-nodes", label: "免费节点" },
  { href: "/faq", label: "问答FAQ" },
  { href: "/clients", label: "客户端" },
  { href: "/knowledge", label: "专线科普" },
]

export const NAVIGATION: LinkConfig[] = NAV_LINKS.map(({ href, label }) => ({
  href,
  label,
}))

export const PUB_CONFIG: PublicationConfig = {
  maxFirstAuthors: 6,
  maxLastAuthors: 1,
  highlightAuthor: {
    firstName: "机场",
    lastName: "推荐",
    aliases: ["机场推荐"],
  },
  equalSymbols: {
    first: "*",
    second: "†",
    third: "‡",
    last: "§",
  },
}

export const FOOTER: FooterConfig = {
  credits: false,
  sourceCode: undefined,
  sourceContent: undefined,
    footerLinks: [
    { href: "https://jichangtuijian.click/ranking", label: "年度榜单" },
    { href: "https://jichangtuijian.click/brands", label: "品牌库" },
    { href: "https://jichangtuijian.click/free-trial", label: "免费试用" },
    { href: "https://jichangtuijian.click/scam-warning", label: "跑路预警" },
    { href: "https://jichangtuijian.click/free-nodes", label: "免费节点" },
    { href: "https://jichangtuijian.click/faq", label: "高频问答" },
    { href: "https://jichangtuijian.click/clients", label: "客户端下载" },
    { href: "https://jichangtuijian.click/knowledge", label: "专线科普" },
    { href: "https://jichangtuijian.click/privacy", label: "隐私政策" },
    { href: "https://jichangtuijian.click/terms", label: "服务条款与免责声明" },
  ],
}

if (import.meta.env.DEV && typeof window === "undefined") {
  const {
    FooterConfigSchema,
    ProfileConfigSchema,
    PublicationConfigSchema,
    SiteConfigSchema,
  } = await import("@/schemas")
  SiteConfigSchema.parse(SITE)
  ProfileConfigSchema.parse(PROFILE)
  FooterConfigSchema.parse(FOOTER)
  PublicationConfigSchema.parse(PUB_CONFIG)
}
