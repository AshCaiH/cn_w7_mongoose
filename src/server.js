const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const port = 5001;
const app = express();

// HTTP Verbs - GET, POST, PUT, DELETE

// const response = await fetch("https://example.com"); // sends GET request

const home = "/books"

let bookList = [];
let currentID = 0;

const findMatching = (queries) => {
    const returnList = []

    console.log(queries);

    for (const criteria of queries) {
        bookList.map((item) => {
            let matchingCriteria = 0;

            // Compare the criteria against each book's properties.
            for (const criterion in criteria) {
                if (item[criterion] == criteria[criterion]) matchingCriteria++;
                else break;
            }

            // If all critera match, add the book to the list
            if (matchingCriteria == Object.keys(criteria).length) returnList.push(item);
        });
    }

    return returnList;
}

const removeFromList = (items) => {
    for (const item of items) {
        const index = bookList.findIndex((book) => {
            return book.id == item.id;
        });

        console.log(index);
        bookList.splice(index, 1);
    }

    console.log(bookList);
}

app.use(express.json()); // Allows use of json data.

const connection = async () => {
    await mongoose.connect(
        process.env.MONGO_URI
    );
    console.log("DB connection is working");
}

connection();

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

// Create

app.post("/books", (request, response) => {});

// Read

app.get("/books", (request, response) => {});

app.get("/books/getrandom", (request, response) => {});

app.get("/books/search", (request, response) => {});


// Update

app.put("/books", (request, response) => {});


// Delete

app.delete("/books" , (request, response) => {});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log(`Access at http://localhost:${port}${home}`);
});