const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth');
const scoreRoutes = require('./src/routes/score');
const connectDB = require('./src/config/db');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Middleware untuk CORS
app.use(cors());

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/score', scoreRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));