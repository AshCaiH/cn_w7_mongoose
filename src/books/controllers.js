const Book = require("./model");

module.exports = {

    // Create

    addBooks: async (request, response) => {
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
    },


    // Read

    getBooks: async (request, response) => {
        const books = await Book.find({});

        response.send(books);
    },


    getRandomBook: async (request, response) => {
        const books = await Book.find({});
        const randomInt = Math.floor(Math.random() * books.length); 

        response.send(books[randomInt]);
    },


    findBooks: async (request, response) => {
        const query = {}

        query[request.params["property"]] = {
            '$regex': request.params["value"],
            $options: 'is' 
            }

        const books = await Book.find(query);

        response.send(books);
    },


    listValues: async (request, response) => {
        await response.send(
            await Book.distinct(request.params["property"])
        )
    },


    // Update

    updateBooks: async (request, response) => {
        const targets = await Book.find(request.body.target);

        await Book.updateMany(request.body.target, request.body.correction);

        response.send({message: "Update successful", targets:targets});
    },


    // Delete

    removeBooks: async (request, response) => {
        const books = await Book.find(request.body);

        await Book.deleteMany(request.body)

        response.send({message: "Deletion successful", books:books});
    },
    

    removeAllBooks: async (request, response) => {
        await Book.deleteMany({})

        response.send({message: "All books deleted"});
    },
}