const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./src/db/db");
connectToDb();
const cookieParser = require("cookie-parser");
const userRoutes = require("./src/routes/user.routes");
const captainRoutes = require("./src/routes/captain.routes");
const mapRoutes = require("./src/routes/map.routes");
const rideRoutes = require("./src/routes/ride.routes");
const config = require("./src/config/config");


app.use(cors({
    origin: [
        "https://uber-clone-backend-8rqd.onrender.com",
        "http://localhost:5173"
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);


module.exports = app;