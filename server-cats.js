// Import the NPM modules needed
const express = require("express");
const exphbs = require("express-handlebars");
// Import mongoose and set the DB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cats_db");
const axios = require("axios");

// Setup the default port
let PORT = process.env.PORT || 8080;

// Start up express
const app = express();

// Connect to the MongoDB database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log(`DB connection established!`);

  // 1. Creating a schema (aka table) just a blueprint
  var kittySchema = new mongoose.Schema({
    name: String
  });

  // NOTE: methods must be added to the schema before compiling it with mongoose.model()
  kittySchema.methods.speak = function() {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  // 2. Take the schema and make a model
  // Fancy constructors, they create and can read documents
  var Kitten = mongoose.model("Kitten", kittySchema);

  // 3. An instance of a model is called a document
  var silence = new Kitten({ name: "Silence" });
  console.log(silence.name); // 'Silence'

  // 4. Methods of a schema are added to the model and available to the following documents
  var fluffy = new Kitten({ name: "fluffy" });
  //   fluffy.speak(); // "Meow name is fluffy"

  // 5. Each 'document' can be saved to the database by calling its save method.
  silence.save(function(err, silence) {
    if (err) throw err;
    silence.speak();
  });

  fluffy.save(function(err, fluffy) {
    if (err) throw err;
    fluffy.speak();
  });

  // 6. We can access all of the kitten 'documents' through our Kitten model.
  Kitten.find({}, function (err, kittens) {
    if (err) throw err;
    // kittens will be an array of the all the documents
    // console.log(kittens);
  });

  // 7. If we want to filter our kittens by name
  Kitten.find({ name: /^fluff/ }, function (err, kittens) {
    if (err) throw err;
    // kittens will be an array of the all the documents that have a name containing 'fluff'
    console.log(kittens);
  });
});

// Serve static content for the app from the 'public' dir
app.use(express.static("public"));

// Parse the app. body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set the default view engine to be handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./controllers/html-routes")(app);
require("./controllers/api-routes")(app);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
