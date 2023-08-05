// next-auth.config.js
module.exports = {
  // Other configuration options
  callbacks: {
    async redirect(url, baseUrl, { session }) {
      // Check if the URL starts with the base URL (same origin) and the user is not already authenticated
      if (url.startsWith(baseUrl) && !session) {
        return url; // Redirect to the requested URL
      } else {
        return "/";
      }
    },
  },
};
