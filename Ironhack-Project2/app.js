// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();
//const dogApi= new dogApiFact();
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app)

// default value for title local


app.locals.appTitle = `4Legs`;
// app.get('/', (req,res)=>{
//     dogApi.getFact().then(fact=>{
//         res.render('/')
//     })
// });

// 👇 Start handling routes here
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


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
