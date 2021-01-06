const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Artwork = require('../../models/Artwork');

// @route   POST api/artworks
// @desc    Add an artwork
// @access  Private

router.post(
    '/', 
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('size', 'Size is required').not().isEmpty(),
            check('medium', 'Medium is required').not().isEmpty(),
            check('photoURL', 'Photo URL is required').not().isEmpty()
        ]
    ], 
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            photoURL,
            size,
            medium,
            date
        } = req.body;

        // Build artwork object
        const artworkFields = {};
        artworkFields.user = req.user.id;

        if (title) artworkFields.title = title;
        if (photoURL) artworkFields.photoURL = photoURL;
        if (size) artworkFields.size = size;
        if (medium) artworkFields.medium = medium;
        if (date) artworkFields.date = date;

        try {
            let artwork = new Artwork(artworkFields);

            await artwork.save();

            res.send(artwork);


        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/artworks
// @desc    get all artworks
// @access  Public

router.get('/', async (req, res) => {
    try {

        const artworks = await Artwork.find().populate('user', ['name', 'avatar']);
        res.json(artworks);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/artworks/:artwork_id
// @desc    Add an artwork by id
// @access  Public
router.get('/:artwork_id', async (req, res) => {
    try {

        const artwork = await Artwork.findById(req.params.artwork_id).populate('user', ['name', 'avatar']);
        
        if (!artwork) return res.status(400).json({ msg: 'Artwork not found' });

        res.json(artwork);
        
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Artwork not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/artworks/:artwork_id
// @desc    Delete an artwork by id
// @access  Private

router.delete('/:artwork_id', auth, async (req, res) => {
    try {
        await Artwork.findByIdAndDelete(req.params.artwork_id);

        res.json({ msg: 'Artwork deleted'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;