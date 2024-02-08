const { Router } = require("express");
const bookRouter = Router();

const Book = require("./model");

// Create

bookRouter.post("/books", async (request, response) => {
    const successful = [];

    for (item of request.body) {
        try {
            const book = new Book(item);
            await book.save();
            successful.push(book);
        } catch (err) {
            console.error(item.title + " already in database");
        }
    }

    response.send({ message: `${successful.length}/${request.body.length} items added to database.`, books:successful });
})


// Read

bookRouter.get("/books", async (request, response) => {
    const books = await Book.find({});

    response.send(books);
});

bookRouter.get("/books/getrandom", async (request, response) => {
    const books = await Book.find({});
    const randomInt = Math.floor(Math.random() * books.length); 

    response.send(books[randomInt]);
});

bookRouter.get("/books/search", async (request, response) => {
    const books = await Book.find(request.body);

    response.send(books);
});


// Update

bookRouter.put("/books", async (request, response) => {
    const targets = await Book.find(request.body.target);

    await Book.updateMany(request.body.target, request.body.correction);

    response.send({message: "Update successful", targets:targets});
});


// Delete

bookRouter.delete("/books", async (request, response) => {
    const books = await Book.find(request.body);

    await Book.deleteMany(request.body)

    response.send({message: "Deletion successful", books:books});
});


module.exports = bookRouter;