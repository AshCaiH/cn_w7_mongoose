const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
        unique: false,
    },
    genre: {
        type: String,
        required: false,
        unique: false,
    },
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;