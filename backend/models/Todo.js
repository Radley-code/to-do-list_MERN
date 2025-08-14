const mongoose = require('mongoose');

//define the Todo schema items
const todoSchema = new mongoose.Schema({
    title: {
        type: String,   
        required: true, // Title is required
        trim: true, // Remove whitespace from both ends
    },
    completed: {
        type: Boolean,
        default: false, // Default value is false because a todo is not completed initially
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

//Export the Todo model
module.exports = mongoose.model('items', todoSchema);