module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        "/",
        "/about",
        "/gallery",
        "/find-trip",
        "/contactus",
        "/aboutus"
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    },
    sitemap: {
      productionOnly: true,
      outputDir: "public",
      pretty: true,
      urls: [
        "https://nktravelsafaris.com/",
        "https://nktravelsafaris/aboutus",
        "https://nktravelsafaris/gallery",
        "https://nktravelsafaris/find-trip",
        "https://nktravelsafaris/contactus"
      ]
    }
  }
};
