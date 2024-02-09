const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connection = require("./db/connection");
const bookRouter = require("./books/routes");

const port = 5001;
const app = express();

const home = "/books"

app.use(express.json(), cors()); // Allows use of json data.

connection();

app.use(bookRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log(`Access at http://localhost:${port}${home}`);
});