const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDatabase = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const isTest = process.env.ISTEST === "true"; // Convert string to boolean

// Get allowed origins from environment variable and convert them to an array
const allowedProdOrigins = process.env.ALLOWED_PROD_ORIGINS
  ? process.env.ALLOWED_PROD_ORIGINS.split(",")
  : [];


// CORS allow any request from localhost
const corsOptions = isTest ? 
{
  origin: function (origin, callback) {
    // Allow requests from localhost with any port
    if (!origin || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  // credentials: true,
} :
{
  origin: function (origin, callback) {
    if (!origin || allowedProdOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
};

// Enable CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests


// Connect to Database
connectDatabase();

// Routes
const benefitRoutes = require('./routes/benefitRoutes');
app.use('/api/benefits', benefitRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;