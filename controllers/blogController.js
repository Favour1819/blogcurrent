const blogModel = require("../models/blogModel")


// create a post
exports.createPost = async (req, res)=>{
  try {
    const {title, content} = req.body
    const newPost = await blogModel.create({
        title,
       content
    })
    res.status(201).json({
        message: `blog post created successfullY`,
        newPost
        })
      }
catch (error) {
    res.status(500).json({
    message: error.message
    })
  }
}

// view or get a post
exports.getOne = async(req, res)=>{
    try {
        const {id} = req.params
        const blogPost = await blogModel.findById(id).populate('comments')
        if (!blogPost) {
            return res.status(404).json({
                message:`blogId not found`,
            })
        } else {
            return res.status(200).json({
                message:`viewing blog post`,
                blogPost
            })   
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message, 
        })   
    }
}

//    view or get all blog post
exports.getAll = async(req, res)=>{
    try {
       const blogs = await blogModel.find()
        if (!blogs) {
            return res.status(404).json({
                message:`blogs not found`,
            })
        } else {
            return res.status(200).json({
                message:`there are ${blogs.length} blogs found in this page`,
                blogs
            })   
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })   
    }
}


    // update a blog post
exports.update = async(req, res)=>{
    try {
        const {title, content} = req.body
       const {id} = req.params
       const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(404).json({
                message:`blog not found`,
            })
        }
        const updateBlog = await blogModel.findByIdAndUpdate(id, {title, content}, {new:true})
        if (updateBlog) {
            return res.status(404).json({
                message:`blog updated successfully`,
                data: updateBlog
            })
        } else{
            return res.status(404).json({
                message:`cannot update blog`,
            })
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })   
    }
}


//   delete a blog post
exports.deleteOne = async(req, res)=>{
    try {
       const {id} = req.params
       const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(404).json({
                message:`blog not found`,
            })
        }
        blog.comments = null
        const deleteBlog = await blogModel.findByIdAndDelete(id)
        if (deleteBlog) {
            return res.status(404).json({
                message:`blog deleted successfully`,
                data: deleteBlog
            })
        } else{
            return res.status(404).json({
                message:`cannot deleted blog`,
            })
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })   
    }
}

