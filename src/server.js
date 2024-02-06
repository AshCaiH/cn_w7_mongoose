const express = require("express");

const port = 5001;
const app = express();

// HTTP Verbs - GET, POST, PUT, DELETE

// const response = await fetch("https://example.com"); // sends GET request

const home = "/listbooks"

const bookList = [];

app.use(express.json()); // Allows use of json data.

app.get("/books", (request, response) => {
    response.send({message: "success", books: bookList});
});

app.get("/books/getrandom", (request, response) => {
    const randomIndex = Math.floor(Math.random() * bookList.length);
    response.send(bookList[randomIndex]);
});

app.post("/books", (request, response) => {
    for (item of request.body) bookList.push(item);

    response.send({ message: "success", fakeArr: bookList });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log(`Access at http://localhost:${port}${home}`);
});