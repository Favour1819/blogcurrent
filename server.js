const express = require('express'); 
require('./dbConfig/dbConfig.js')
const blogRouter = require("./routers/blogRouter")
const commentRouter = require("./routers/commentRouter.js")
const PORT = process.env.port

const app = express();
app.use(express.json());

app.use("/api/v1/", blogRouter);
app.use("/api/v1/", commentRouter);


app.listen(PORT,()=>{
   console.log(`Server is running on ${PORT}`)
})
