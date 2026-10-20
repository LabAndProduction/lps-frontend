import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { seoBlogDataSync } from "@webnumseoagent/next/build";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // SEO Agent: включаем файлы блога (content/blog) в serverless-бандл — нужно для ISR-ревалидации
  // страниц блога и route-handler карты сайта, которые читают эти файлы в рантайме на Vercel.
  outputFileTracingIncludes: {
    "/**": ["./content/blog/**/*"],
  },
    reactStrictMode: true,
    images: {
        // the API's image host; without PATTERN (a build outside the server) there is none
        remotePatterns: process.env.PATTERN ? [{ protocol: "https", hostname: process.env.PATTERN }] : [],
        qualities: [100, 75],
    },
    env: {
        API: process.env.API_URL,
    },
    trailingSlash: true,
    async redirects() {
        return [
            {
                source: "/dashboard/profile",
                missing: [
                    {
                        type: "cookie",
                        key: "token",
                    },
                ],
                permanent: false,
                destination: "/",
            },
            {
                source: "/dashboard/orders",
                missing: [
                    {
                        type: "cookie",
                        key: "token",
                    },
                ],
                permanent: false,
                destination: "/",
            },
        ];
    },
};

export default withNextIntl(nextConfig);

// SEO Agent: перед сборкой кладём статьи блога (content/blog) в модуль content/seoagent-blog.ts — их читают
// страницы блога и карта сайта там, где у хостинга нет файловой системы (Cloudflare Workers).
seoBlogDataSync({ out: "content/seoagent-blog.ts" });
