const mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Define what goes in the article model thru a schema
let ArticleSchema = new Schema ({
    // title: required string
    title: {
        type: String,
        required: true
    },
    // link: required string that needs a dot
    link: {
        type: String,
        required: true,
    }
    // note: an object that just stores an id in reference to the id of the Note model
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// Creating the actual model from the schema
let Article = mongoose.model("Article", ArticleSchema);

// Export the model to use in other parts of the app
module.exports = Article;