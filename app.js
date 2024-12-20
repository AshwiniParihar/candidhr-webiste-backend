const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const adminRoutes = require("./routes/adminRoutes");
const blogRoutes=require("./routes/blogRoute")

const app = express();

// CORS middleware configuration
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from the frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

app.use(express.json());

// Routes
app.use("/api/admins", adminRoutes);
app.use("/api/blog", blogRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

