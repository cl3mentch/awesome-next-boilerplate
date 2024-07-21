export const urlList = {
  dev: {
    domainURL: process.env.STAG_DOMAIN_URL,
    baseUrl: process.env.STAG_BASE_URL,
    apiBase: process.env.STAG_API_BASE,
    wsBase: process.env.STAG_WS_BASE,
  },
  live: {
    domainURL: process.env.PROD_DOMAIN_URL,
    baseUrl: process.env.PROD_BASE_URL,
    apiBase: process.env.PROD_API_BASE,
    wsBase: process.env.PROD_WS_BASE,
  },
};

export const urls =
  process.env.NODE_ENV === "production" ? urlList.live : urlList.dev;
