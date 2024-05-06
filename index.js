const express = require('express');
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
    res.send("Worked!");
})

app.listen(port, () => {
    console.log("Server is running on port 3000");
})
