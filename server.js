const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Vercel автоматически назначает порт через process.env.PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});

module.exports = app;