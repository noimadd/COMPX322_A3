const express = require('express');
const dotenv = require('dotenv');

const router = express.Router();

dotenv.config();

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;