const mongoose = require("mongoose")
require("dotenv").config()

const DB = process.env.DB

mongoose.connect(DB)
.then(()=>{
 console.log('Database connection sucessfully')
}).catch((e)=>{
    console.log(e.message)
})
