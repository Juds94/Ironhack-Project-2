
require("dotenv/config");

require("./db");


const express = require("express");


const hbs = require("hbs");

const app = express();

require("./config")(app);
require("./config/session.config")(app)


app.locals.appTitle = `4Legs`;


const index = require("./routes/index");
app.use("/", index);
const authRoutes = require("./routes/auth.routes")
app.use("/", authRoutes);
const userRoutes = require("./routes/user.routes")
app.use("/", userRoutes);
const reviewRoutes = require("./routes/review.routes")
app.use("/review", reviewRoutes);
const dogsRoutes = require("./routes/dogs.routes")
app.use("/dog", dogsRoutes)

require("./error-handling")(app);

module.exports = app;
