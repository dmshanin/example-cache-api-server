const express = require('express');
const router = express.Router();

// Middleware для установки заголовков кэширования
const setCacheHeaders = (res, maxAge = 10) => {
  res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
  res.setHeader('ETag', 'demo-etag-123');
  res.setHeader('Access-Control-Allow-Origin', '*');
};

// API endpoints
router.get('/data', (req, res) => {
  setCacheHeaders(res, 10); // Кэш на 10 секунд
  
  const data = {
    message: 'Данные с сервера',
    timestamp: new Date().toISOString(),
    value: Math.random() * 100,
    environment: process.env.NODE_ENV || 'development'
  };
  
  res.json(data);
});

router.get('/static-data', (req, res) => {
  setCacheHeaders(res, 3600); // Кэш на 1 час
  
  const data = {
    message: 'Статические данные',
    countries: ['Russia', 'USA', 'Germany', 'China'],
    cachedAt: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  };
  
  res.json(data);
});

router.get('/time', (req, res) => {
  const data = {
    currentTime: new Date().toISOString(),
    server: 'Node.js Express API',
    port: process.env.PORT || 'not set',
    environment: process.env.NODE_ENV || 'development'
  };
  
  res.json(data);
});

// Health check для Vercel
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

module.exports = router;