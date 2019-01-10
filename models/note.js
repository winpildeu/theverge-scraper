const mongoose = require('mongoose');

// Reference to the Schema constructor
const Schema = mongoose.Schema;

// Make a schema for the note model
let NoteSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
});

// Make the model using the schema
let Note = mongoose.model("Note", NoteSchema);

// Export the module to use in the app
module.exports = Note;