const { Router } = require("express");
const bookRouter = Router();
const controllers = require("./controllers");

// Create

// Adds a book to the database.
bookRouter.post("/books", controllers.addBooks)


// Read

// Returns the data of all books.
bookRouter.get("/books", controllers.getBooks);

// Returns the data on a randomly chosen book
bookRouter.get("/books/getrandom", controllers.getRandomBook);

// Returns a list of the distinct values of a given property.
// eg: books/author/ lists all authors.
bookRouter.get("/books/:property", controllers.listValues);

// Returns a book based searching for a given property and value.
// eg: books/title/the returns any books with titles containing the word "the"
bookRouter.get("/books/:property/:value", controllers.findBooks);


// Update

// Updates the data stored on books matching the search criteria.
bookRouter.put("/books", controllers.updateBooks);


// Delete

// Removes books matching the search criteria from the database.
bookRouter.delete("/books", controllers.removeBooks);
bookRouter.delete("/books/deleteall", controllers.removeAllBooks);


module.exports = bookRouter;