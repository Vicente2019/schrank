const express = require('express');
const router = express.Router();
const Item = require("../models/item");

router.get('/', (req, res) => {
    res.send("Page with all items should be here");
});

router.post('/', async (req, res, next) => {
    const item = new Item(req.body.item);
    await item.save();
    res.redirect(`/items/${item._id}`);
});

router.get('/new', (req, res) => {
    res.send("add item to your closet");
});

router.get('/:id', (req, res) => {
    res.send("see single item");
});

module.exports = router;