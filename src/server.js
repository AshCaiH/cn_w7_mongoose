const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const connection = require("./db/connection");
const Book = require("./books/model");

const port = 5001;
const app = express();

const home = "/books"

app.use(express.json()); // Allows use of json data.

connection();

// Create

app.post("/books", async (request, response) => {
    const successful = [];

    for (item of request.body) {
        try {
            const book = new Book(item);
            await book.save();
            successful.push(book);
        } catch (err) {
            console.error("item.title" + " already in database");
        }
    }

    response.send({ message: `${successful.length}/${request.body.length} items added to database.`, books:successful });
})

// Read

app.get("/books", async (request, response) => {
    const books = await Book.find({});

    response.send(books);
});

app.get("/books/getrandom", async (request, response) => {
    const books = await Book.find({});
    const randomInt = Math.floor(Math.random() * books.length); 

    response.send(books[randomInt]);
});

app.get("/books/search", async (request, response) => {
    const books = await Book.find(request.body);

    response.send(books);
});


// Update

app.put("/books", async (request, response) => {
    const targets = await Book.find(request.body.target);

    await Book.updateMany(request.body.target, request.body.correction);

    response.send({message: "Update successful", targets:targets});
});


// Delete

app.delete("/books", async (request, response) => {
    const books = await Book.find(request.body);

    await Book.deleteMany(request.body)

    response.send({message: "Deletion successful", books:books});
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log(`Access at http://localhost:${port}${home}`);
});