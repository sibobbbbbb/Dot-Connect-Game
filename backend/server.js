const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth');
const connectDB = require('./src/config/db');

dotenv.config();
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

connectDB();

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));