const { MeiliSearch } = require("meilisearch");
require("dotenv").config({ path: ".env.local" });
const fs = require("fs");

if (!process.env.NEXT_PUBLIC_MEILI_HOST) {
  throw new Error(
    "The environment variable NEXT_PUBLIC_MEILI_HOST is missing but required."
  );
}

if (!process.env.MEILI_MASTER_KEY) {
  throw new Error(
    "The environment variable MEILI_MASTER_KEY is missing but required."
  );
}

if (!process.env.NEXT_PUBLIC_MEILI_PUBLIC_KEY) {
  const client = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MEILI_HOST,
    apiKey: process.env.MEILI_MASTER_KEY,
  });

  client
    .createKey({
      description: "Key for the frontend",
      actions: ["search", "documents.get", "indexes.get"],
      indexes: ["*"],
      expiresAt: null,
    })
    .then((res) => {
      console.log("The key for the frontend is: " + res["key"]);

      fs.appendFileSync(
        ".env.local",
        `\nNEXT_PUBLIC_MEILI_PUBLIC_KEY=${res["key"]}`
      );
    });

  console.log("Key created");
}

console.log("Setup done");
