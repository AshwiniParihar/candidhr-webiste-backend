const Blog = require("../models/blog");

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    console.log("string")
    const { content } = req.body; // Extract content from the request body

    // Create a new blog instance
    const newBlog = new Blog({
      content,
    });

    // Save the blog to the database
    const savedBlog = await newBlog.save();

    // Access the `_id`
    const blogId = savedBlog._id;

    // Return the saved blog as a response
    res.status(201).json({
      message: "Blog created successfully",
      blog: savedBlog, // Includes the full document
      blogId, // Explicitly return `_id`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch all blogs from the database
    res.status(200).json(blogs); // Send the list of blogs as the response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
