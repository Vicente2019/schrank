const express = require('express');
const mongoose = require("mongoose");
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = 8080;
const outfitsRoutes = require('./routes/outfits');
const itemsRoutes = require('./routes/items');

mongoose.connect("mongodb://localhost:27017/schrank")
    .then(() => {
        console.log("Connected to MongoDB!");
    }).catch((error) => {
        console.log("Error connecting to MongoDB: ", error);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send("Schrank!!");
});

app.get('/closet', (req, res) => {
    res.send("All the items should be here.");
});

app.use('/outfits', outfitsRoutes);
app.use('/items', itemsRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});