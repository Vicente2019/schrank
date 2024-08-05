const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/schrank")
    .then(() => {
        console.log("Connected to MongoDB!");
    }).catch((error) => {
        console.log("Error connecting to MongoDB: ", error);
    });

app.get('/', (req, res) => {
    res.send("Schrank!!");
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});