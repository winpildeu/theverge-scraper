const mongoose = require('mongoose');

// Reference to the Schema constructor
const Schema = mongoose.Schema;

// Make a schema for the note model
let noteSchema = new Schema({
    // Id referencing the id's from the Headline model
    _headlineId: {
      type: Schema.Types.ObjectId,
      ref: "Headline"
    },
    // The date created
    date: {
        type: Date,
        default: Date.now
    },
    // The text of the note
    noteText: {
      type: String
    }
});

// Make the model using the schema
let Note = mongoose.model("Note", noteSchema);

// Export the module to use in the app
module.exports = Note;