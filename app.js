const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const adminRoutes = require("./routes/adminRoutes");
const blogRoutes=require("./routes/blogRoute")

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(express.json());


app.use("/api/admins", adminRoutes);
app.use("/api/blog", blogRoutes);


app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

