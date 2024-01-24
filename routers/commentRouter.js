const { newComment,update, deleteOne, getAll } = require("../controllers/commentController")

const router = require("express").Router()

// post a new comment
router.post("/anewcomment",newComment )

// update a comment
router.put("/updatecomment/:id",update )

// delete a comment
router.delete("/deletecomment/:id", deleteOne)

// 
router.get("/allcomments", getAll)
module.exports = router