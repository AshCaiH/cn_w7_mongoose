const { Router } = require("express");
const bookRouter = Router();
const controllers = require("./controllers");

// Create

bookRouter.post("/books", controllers.addBooks)


// Read

bookRouter.get("/books", controllers.getBooks);

bookRouter.get("/books/getrandom", controllers.getRandomBook);

// bookRouter.get("/books/search", findBooks);

bookRouter.get("/books/:property", controllers.listValues);
bookRouter.get("/books/:property/:value", controllers.findBooks);

// Update

bookRouter.put("/books", controllers.updateBooks);


// Delete

bookRouter.delete("/books", controllers.removeBooks);


module.exports = bookRouter;