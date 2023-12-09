const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/stratego-api',
    createProxyMiddleware({
      target: 'https://stratego2023.duckdns.org:2002',
      changeOrigin: true,
      secure: false,
    })
  );
};