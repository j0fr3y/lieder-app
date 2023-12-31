const index = require("@strapi/plugin-i18n/strapi-admin");
const song = require("../src/api/song/controllers/song");

module.exports = ({ env }) => ({
  //...
  meilisearch: {
    config: {
      // Your meili host
      host: env("MEILI_HOST"),
      // Your master key or private key
      apiKey: env("MEILI_MASTER_KEY"),
    },
  },
});
