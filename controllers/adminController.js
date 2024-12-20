const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
require('dotenv').config(); 

function generateToken(email) {
    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

// Admin Login
exports.loginAdmin = async (req, res) => {
    const { email, password, role } = req.body;
  
    const staticUser = {
      email: "admin@example.com",
      password: "password123",
      role: "Admin", // Admin role is hardcoded here
    };
  
    try {
      // Check if email and password match
      if (email === staticUser.email && password === staticUser.password) {
        // Check if the role is 'Admin'
        if (role !== staticUser.role) {
          return res.status(403).json({ message: "You are not authorized to access this page." });
        }
  
        // If everything matches, generate a JWT token (can use your existing token generation logic)
        const token = generateToken(staticUser.email); // Assuming generateToken function exists
  
        return res.json({
          email: staticUser.email,
          role: staticUser.role,
          token: token,
        });
      } else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  };
  
  

  

//   try {
//     const admin = await Admin.findOne({ email });
//     if (admin && (await admin.matchPassword(password))) {
//       res.json({
//         _id: admin.id,
//         email: admin.email,
//         role: admin.role,
//         token: generateToken(admin.id),
//       });
//     } else {
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }


// Admin Registration
// exports.registerAdmin = async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     const existingAdmin = await Admin.findOne({ email });

//     if (existingAdmin) {
//       return res.status(400).json({ message: "Admin already exists" });
//     }

//     const admin = await Admin.create({
//       email,
//       password,
//       role,
//     });

//     if (admin) {
//       res.status(201).json({
//         _id: admin.id,
//         email: admin.email,
//         role: admin.role,
//         token: generateToken(admin.id),
//       });
//     } else {
//       res.status(400).json({ message: "Invalid Admin Data" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
