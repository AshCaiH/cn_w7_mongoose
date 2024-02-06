const express = require("express");

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

// Create

app.post("/books", (request, response) => {
    for (item of request.body) {
        item.id = currentID;
        currentID++;
        bookList.push(item);
    }

    response.send({ message: "success", bookList: bookList });
});

// Read

app.get("/books", (request, response) => {
    console.log(request.body);
    response.send({message: "success", books: bookList});
});

app.get("/books/getrandom", (request, response) => {
    const randomIndex = Math.floor(Math.random() * bookList.length);
    response.send(bookList[randomIndex]);
});

app.get("/books/search", (request, response) => {
    const matches = findMatching(request.body);

    if (matches.length == 0) response.send("No books found with that criteria");
    else response.send("Found the following items: \n\n" + matches.map((item) => {
        return item.title + " "
    }).join("\n"));
});

// Update

// Enter in the following format
/*
{
  "search": {
    "key": "value"
  },
  "correction" : {
    "key": "new value"
  }
}
*/

app.put("/books", (request, response) => {

    const matching = findMatching([request.body.search]);
    const changes = []

    console.log(matching);

    if (matching.length > 0) {
        for (const key in request.body.correction) {
            matching.map((item) => {
                changes.push([item[key], request.body.correction[key]]);
                item[key] = request.body.correction[key];
            });
        }
    }

    response.send(changes.map((item) => {
        return `"${item[0]}" changed to "${item[1]}"`
    }).join("\n"));

});

// Delete

app.delete("/books" , (request, response) => {
    const removalList = findMatching(request.body);

    removeFromList(removalList);

    response.send("Removed the following items: \n\n" + removalList.map((item) => {
        return item.title + " "
    }).join("\n"));
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log(`Access at http://localhost:${port}${home}`);
});