import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    const assetRule = config.module.rules.find(
      (rule: { test?: { test?: (value: string) => boolean } }) =>
        rule.test?.test?.(".svg"),
    );

    if (assetRule && typeof assetRule === "object") {
      config.module.rules.push(
        {
          ...assetRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          issuer: assetRule.issuer,
          resourceQuery: {
            not: [
              ...((assetRule.resourceQuery?.not as RegExp[] | undefined) ?? []),
              /url/,
            ],
          },
          use: ["@svgr/webpack"],
        },
      );

      assetRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;
