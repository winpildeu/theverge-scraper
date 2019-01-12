const mongoose = require("mongoose");

// Save a reference to the Schema constructor
let Schema = mongoose.Schema;

// Define what goes in the headline model thru a schema
let headlineSchema = new Schema({
  // title: required string that is unique
  headline: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },
  // link: required string that needs a dot
  url: {
    type: String,
    required: true,
  },
  // date: a string of the date added
  date: {
    type: Date,
    default: Date.now
  },
  // saved: a boolean showing the state if the headline was saved or not
  saved: {
    type: Boolean,
    default: false
  } 
});

// Creating the actual model from the schema
let Headline = mongoose.model("Headline", headlineSchema);

// Export the model to use in other parts of the app
module.exports = Headline;