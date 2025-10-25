require('dotenv').config();
const express = require('express')
const connectDB = require('./config/db')
const authroutes = require("./routes/authroutes")
const Habitroutes = require('./routes/habitRoutes')
const habitlog = require('./routes/logroutes')
const goalroutes = require('./routes/goalRoutes')
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 4300
const cors = require('cors')

app.use(cors())

app.use("/Goal" , goalroutes)
app.use("/habitLog" , habitlog)
app.use("/users" , authroutes)
app.use("/habit" , Habitroutes)
connectDB()
app.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`)
})








