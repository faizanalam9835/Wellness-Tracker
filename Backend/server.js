require('dotenv').config();
const express = require('express')
const connectDB = require("./config/db")
const authroutes = require("./routes/authroutes")
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 4300


app.use("/users" , authroutes)
connectDB()
app.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`)
})


