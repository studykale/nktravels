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
        "https://nktravelsafaris.com/aboutus",
        "https://nktravelsafaris.com/gallery",
        "https://nktravelsafaris.com/find-trip",
        "https://nktravelsafaris.com/contactus"
      ]
    }
  }
};
