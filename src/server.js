const express = require("express");

const app = express();

app.use("/example", express.static("example"));

app.listen(5001, () => {
    console.log("Server is listening on port 5001");
});