/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  // Add redirects here
  async redirects() {
    return [
      {
        source: "/trauma-pride-and-theatre-school-a-dangerous-trio",
        destination: "/blog/trauma-pride-theatre-school",
        permanent: true, // 301 redirect
      },
      {
        source: "/[style]/[discipline]/select-next",
        destination: "/program-directory",
        permanent: true, // 301 redirect
      },
      // {
      //   source: '/about',
      //   destination: '/about-us',
      //   permanent: false, // 302 temporary redirect
      // },
    ];
  },
};
export default config;
