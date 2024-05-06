const express = require('express');
const {sequelize} = require('./model/bd');
const app = express();
const port = 3000;

app.get("/install", async (req, res) => {
    await sequelize.sync({force: true});
    res.send("Worked!");
})

app.listen(port, () => {
    console.log("Server is running on port 3000");
})
