const express = require("express");

const port = 5001;
const app = express();

// HTTP Verbs - GET, POST, PUT, DELETE

// const response = await fetch("https://example.com"); // sends GET request

const home = "/listbooks"

let bookList = [];

app.use(express.json()); // Allows use of json data.

app.get("/books", (request, response) => {
    response.send({message: "success", books: bookList});
});

app.get("/books/getrandom", (request, response) => {
    const randomIndex = Math.floor(Math.random() * bookList.length);
    response.send(bookList[randomIndex]);
});

app.delete("/books/remove" , (request, response) => {
    let removalList = [];

    const removeItems = (criteria) => {
        // If no criteria are provided, skip this function.
        if (Object.keys(criteria).length == 0) return;

        bookList = bookList.filter((item) => {
            let matchingCriteria = 0;

            for (const criterion in criteria) {
                if (item[criterion] == criteria[criterion]) matchingCriteria++;
                else break;
            }

            // If not all criteria match, keep this book.
            if (matchingCriteria != Object.keys(criteria).length) return item;
            else removalList.push(item);
        });
    }

    for (const criteria of request.body) removeItems(criteria);

    response.send("Removed the following items: \n\n" + removalList.map((item) => {
        return item.title + " "
    }));
});

app.post("/books", (request, response) => {
    for (item of request.body) bookList.push(item);

    response.send({ message: "success", fakeArr: bookList });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log(`Access at http://localhost:${port}${home}`);
});