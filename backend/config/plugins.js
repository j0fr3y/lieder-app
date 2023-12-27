const index = require("@strapi/plugin-i18n/strapi-admin");
const song = require("../src/api/song/controllers/song");

module.exports = () => ({
  //...
  meilisearch: {
    config: {
      // Your meili host
      host: "http://localhost:7700",
      // Your master key or private key
      apiKey: "masterKey",
    },
  },
});
