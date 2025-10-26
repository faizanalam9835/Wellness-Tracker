require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const scheduler = require('./utils/scheduler');

const authroutes = require("./routes/authroutes");
const Habitroutes = require('./routes/habitRoutes');
const habitlog = require('./routes/logroutes');
const goalroutes = require('./routes/goalRoutes');
const soulroutes = require("./routes/soulFuelRoutes");
const notificationroutes = require("./routes/notificationRoutes");
const analytics = require("./routes/analyticsRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Connect to MongoDB before starting server
connectDB();

// Initialize background scheduler
scheduler.init();

// Routes
app.use('/soulfuel', soulroutes);
app.use('/notifications', notificationroutes);
app.use('/analytics', analytics);
app.use("/Goal", goalroutes);
app.use("/habitLog", habitlog);
app.use("/users", authroutes);
app.use("/habit", Habitroutes);

// Default route
app.get('/', (req, res) => {
  res.send('✅ Wellness Tracker backend is running');
});

const PORT = process.env.PORT || 4300;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
