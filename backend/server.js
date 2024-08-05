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
});

app.get('/closet', (req, res) => {
    res.send("All the items should be here.");
});

app.get("/outfits", (req, res) => {
    res.send("Page with outfits should be here");
});

app.get("/outfits/new", (req, res) => {
    res.send("Form for new outfit");
});

app.get("/outfits/:id", (req, res) => {
    res.send("Single outfit page");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});