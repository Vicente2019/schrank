const express = require('express');
const router = express.Router();
const Item = require("../models/item");

router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Failed to fetch items" });
    }
});

router.post('/', async (req, res, next) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json({ message: 'Item created successfully', item });
    } catch (error) {
        console.error("Error creating item:", error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/new', (req, res) => {
    res.send("add item to your closet");
});

router.get('/:id', (req, res) => {
    res.send("see single item");
});

module.exports = router;