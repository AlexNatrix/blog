const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "blog",
    workboxPluginMode: "GenerateSW",

    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: new RegExp("^https://api.hh.ru/vacancies"),
          handler: "CacheFirst",
          method: "GET",
          options: {
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  },
});
