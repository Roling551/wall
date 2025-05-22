const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const angularDistPath = path.join(__dirname, '../../dist/wall/browser');
console.log(angularDistPath);

// Proxy API requests
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:8080',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
}));

// Serve static files
app.use(express.static(angularDistPath));

// Handle all other routes
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(angularDistPath, 'index.html'));
});

const PORT = 4201;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});