const commentModel = require('../models/commentModel');
const blogModel = require('../models/blogModel')

// create A COMMENT FOR a post or blog
exports.newComment = async (req,res)=>{
    try{
        const {name, message, id} = req.body
        const blog = await blogModel.findById(id);
        if (!blog){
            return res.status (404).json({
                message:'BlogPost not found'
            })
        }

        const comment = await commentModel.create({name, message});
        blog.comments.push(comment._id)
        comment.post = blog._id

        await blog.save();
        await comment.save();

        res.status (200).json({
            message: 'You have sucessfully posted a comment',
            data: comment
        })

    }catch(error){
        res.status (500).json({
            message:error.message
        })
    }
}
  

// update a comment name or message
exports.update = async(req, res)=>{
    try {
         const {name, message} = req.body
        const {id} = req.params
       const comment = await commentModel.findById(id)
        if (!comment) {
            return res.status(404).json({
                message:`comment not found`,
            })
        }
        const updateComment = await commentModel.findByIdAndUpdate(id, {name, message}, {new:true})
        if (updateComment) {
            return res.status(404).json({
                message:`comment updated successfully`,
                data: updateComment
            })
        } else{
            return res.status(404).json({
                message:`cannot update comment`,
            })
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })   
    }
}

// delete a comment
exports.deleteOne = async(req, res)=>{
    try {
       const {id} = req.params
       const comment = await commentModel.findById(id)
        if (!comment) {
            return res.status(404).json({
                message:`comment not found`,
            })
        }
        const updateComment = await commentModel.findByIdAndDelete(id)
        if (updateComment) {
            return res.status(404).json({
                message:`comment deleted successfully`,
                data: updateComment
            })
        } else{
            return res.status(404).json({
                message:`cannot deleted comment`,
            })
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })   
    }
}

// get all comments for a post
exports.getAll = async(req, res)=>{
    try {
        const {id} = req.body

       const blog = await blogModel.findById(id).populate("comments")
        if (!blog) {
            return res.status(404).json({
                message:`blog not found`,
            })
        }
        comments = blog.comments
        if (comments === 0) {
            return res.status(404).json({
                message:`there are no comments found on this blog`,
            })
        } else {
            return res.status(404).json({
                message:`here are the comments found on this blog and there are ${comments.length} comments on this blog`,
                comments
            })
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })   
    }
}
