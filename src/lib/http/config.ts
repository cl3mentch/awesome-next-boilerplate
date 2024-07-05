//config.js
let config = {
  localConfig: {
    baseurl: "http://localhost:8080/",
  },
  devConfig: {
    //dev url
    baseurl: process.env.BASE_STAG_URL,
  },
  prodConfig: {
    //prod url
    baseurl: process.env.BASE_PROD_URL,
  },
  getConfig: function () {
    switch (window.location.hostname) {
      case "localhost:8080/":
        return this.localConfig;
      case "development":
        return this.devConfig;
      case "production":
        return this.prodConfig;
    }
  },
};

export default config;
