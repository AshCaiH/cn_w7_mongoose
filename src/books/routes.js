const { Router } = require("express");
const bookRouter = Router();
const {addBooks, getBooks, getRandomBook, findBooks, updateBooks, removeBooks} = require("./controllers");

const Book = require("./model");

// Create

bookRouter.post("/books", addBooks)


// Read

bookRouter.get("/books", getBooks);

bookRouter.get("/books/getrandom", getRandomBook);

bookRouter.get("/books/search", findBooks);


// Update

bookRouter.put("/books", updateBooks);


// Delete

bookRouter.delete("/books", removeBooks);


module.exports = bookRouter;