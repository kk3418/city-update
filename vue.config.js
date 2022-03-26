const fs = require("fs");
const { defineConfig } = require("@vue/cli-service");
const { env } = require("process");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https:
      env.NODE_ENV === "production"
        ? {}
        : {
            key: fs.readFileSync(`${__dirname}/localhost-key.pem`),
            cert: fs.readFileSync(`${__dirname}/localhost.pem`),
          },
    port: "8081",
  },
});
