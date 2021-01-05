const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    Test Route
// @access  Public

router.get('/', (req, res) => res.send('Artwork Route'));

module.exports = router;