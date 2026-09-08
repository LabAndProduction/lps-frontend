import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [{ protocol: "https", hostname: process.env.PATTERN ? process.env.PATTERN : "" }],
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
