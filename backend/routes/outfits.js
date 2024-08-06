const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Page with outfits should be here");
});

router.get('/new', (req, res) => {
    res.send("Form for new outfit");
});

router.get('/:id', (req, res) => {
    res.send("Single outfit page");
});

module.exports = router;