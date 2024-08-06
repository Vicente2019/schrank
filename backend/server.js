const express = require('express');
const mongoose = require("mongoose");
const morgan = require('morgan');
const app = express();
const port = 3000;
const outfitsRoutes = require('./routes/outfits');

mongoose.connect("mongodb://localhost:27017/schrank")
    .then(() => {
        console.log("Connected to MongoDB!");
    }).catch((error) => {
        console.log("Error connecting to MongoDB: ", error);
    });

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send("Schrank!!");
});

app.get('/closet', (req, res) => {
    res.send("All the items should be here.");
});

app.use('/outfits', outfitsRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});