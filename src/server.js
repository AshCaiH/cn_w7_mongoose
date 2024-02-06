const express = require("express");

const port = 5001;
const app = express();

const home = "/"

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log(`Access at http://localhost:${port}${home}`);
});