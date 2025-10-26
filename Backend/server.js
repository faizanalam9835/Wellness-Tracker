require('dotenv').config();
const express = require('express')
const connectDB = require('./config/db')
const authroutes = require("./routes/authroutes")
const Habitroutes = require('./routes/habitRoutes')
const habitlog = require('./routes/logroutes')
const goalroutes = require('./routes/goalRoutes')
// const scheduler = require('./utils/scheduler')
const soulroutes = require("./routes/soulFuelRoutes")
const notificationroutes = require("./routes/notificationRoutes")
const analytics = require("./routes/analyticsRoutes")
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 4300
const cors = require('cors')
const path = require("path")
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors())
connectDB()

// scheduler.init()
app.get("/", (req, res) => {
    try {
      res.status(201).send({ message: "Hello, world!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
app.use('/soulfuel',soulroutes );
app.use('/notifications', notificationroutes);
app.use('/analytics', analytics)
app.use("/goal" , goalroutes)
app.use("/habitLog" , habitlog)
app.use("/users" , authroutes)
app.use("/habit" , Habitroutes)

// app.listen(PORT, ()=>{
//     console.log(`server running at http://localhost:${PORT}`)
// })








app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});








