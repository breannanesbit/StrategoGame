const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/store-api',
    createProxyMiddleware({
      // target: 'https://snowttt.duckdns.org:3006',
      target: 'https://100.68.122.57:2002',
      changeOrigin: true,
      secure: false,
    })
  );
};