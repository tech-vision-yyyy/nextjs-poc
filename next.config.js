module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n: {
    locales: ["en-US", "es-US"],
    defaultLocale: "en-US",
  },
  async redirects() {
    return [
      {
        source: "/signin",
        destination: "/api/auth/signin",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["media.graphcms.com"],
  },
};
