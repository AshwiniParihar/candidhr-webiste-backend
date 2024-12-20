const Blog = require("../models/blog");
const {v4 :uuidv4} = require('uuid')
 exports.createBlog = async (req, res) => {
  try {
    // const { content, bannerImage, title, tag } = req.body; 

    const contentArray = [{ id : uuidv4()  , type: 'editor' , data: ""}];

    const newBlog = new Blog({
      content: JSON.stringify(contentArray),
      bannerImage: "",  
      title:  "",              
      tag:  "",                 
    });

    const savedBlog = await newBlog.save();

    const blogId = savedBlog._id;
    res.status(201).json({
      message: "Blog created successfully",
      blog: savedBlog, 
      blogId, 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    let { content, bannerImage, title, tag } = req.body;  
    console.log("Received blogId:", blogId);
    console.log("Received content:", content);
    console.log("Received bannerImage:", bannerImage);
    console.log("Received title:", title);
    console.log("Received tag:", tag);

    if (typeof content === 'string') {
      content = JSON.parse(content);
    }

    const contentArray = Array.isArray(content) ? content : [];

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        content: JSON.stringify(contentArray),
        bannerImage: bannerImage || "",  
        title: title || "",              
        tag: tag || "",                
      },
      { new: true }  
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog, 
    });
  } catch (error) {
    console.error("Error during blog update:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
      blogId: deletedBlog._id, 
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find(); 
    res.status(200).json(blogs); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    console.log("end Point hit", req.params)
    const {id} = req.params;
    const blog = await Blog.findById(id); 
    res.status(200).json(blog); 
   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};