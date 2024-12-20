const express = require("express");
const { createBlog, getAllBlogs, updateBlog, deleteBlog } = require("../controllers/blogController");

const router = express.Router();

router.post("/create", createBlog);
router.get("/all", getAllBlogs);
router.put("/update/:blogId", updateBlog);
router.delete("/delete/:blogId", deleteBlog); 

module.exports = router;
