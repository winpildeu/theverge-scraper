// Import the NPM modules needed
const express = require("express");
const exphbs = require("express-handlebars");
// Import mongoose and set the DB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/scraper");
// Import axios for ajax requests
const axios = require("axios");
// Import morgan for loggin HTTP data
const logger = require("morgan");

// Setup the default port
let PORT = process.env.PORT || 8080;

// Start up express
const app = express();

// Connect to the MongoDB database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log(`DB connection established!`);
});

// MIDDLEWARE ======================================================

// Use morgan logger for logging requests
app.use(logger("dev"));

// Serve static content for the app from the 'public' dir
app.use(express.static("public"));

// Parse the app. body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set the default view engine to be handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ==================================================================

// Import routes and give the server access to them.
const routes = require("./routes/routes");

app.use('/', routes);
app.use('/test', routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
