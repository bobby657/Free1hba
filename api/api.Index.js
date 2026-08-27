const httpProxy = require('http-proxy-middleware');

module.exports = async (req, res) => {
  // Extract target URL from the query string (e.g., /api?url=https://example.com)
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Error: Please provide a "url" query parameter.');
  }

  // Create and execute the proxy middleware dynamically
  const proxy = httpProxy.createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      return ''; // Strips the local path so it hits the target cleanly
    },
    onProxyRes: (proxyRes, req, res) => {
      // Bypasses CORS restrictions
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
  });

  return proxy(req, res);
};
