const router = require("express").Router()
const { createPost, getOne, getAll, update, deleteOne } = require("../controllers/blogController")

router.post("/newblog", createPost)
router.get("/blog/:id", getOne)
router.get("/blogs", getAll)
router.put("/updateblog/:id", update)
router.delete("/deleteblog/:id", deleteOne)

module.exports = router