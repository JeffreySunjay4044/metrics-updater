const express = require('express');
const router = express.Router();

router.post('/health', (req, res) => {
    res.status(200).send('Ok');
});

module.exports = router;