const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profiles
// @desc    Get Bonnie's profile
// @access  Public

router.get('/', async (req, res) => {
    try {
        // get Bonnie's user
        const BonnieUser = await User.findOne({ name: 'Bonnie Frederico'});
        
        // get Bonnie's profile and populate with name and avatar from user
        const profile = await Profile.findOne({ user: BonnieUser.id }).populate('user', ['name', 'email']);

        if (!profile){
            return res.status(400).json({ msg: 'There is no profile found'});
        }

        res.json(profile);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profiles
// @desc    Create or update profile
// @access  Private

router.post(
    '/', 
    auth,
    async (req, res) => {

        const { description, avatar } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;

        if (description) profileFields.description = description;
        if (avatar) profileFields.avatar = avatar;

        try {

            let profile = await Profile.findOne({ user: req.user.id });

            if (profile){
                // Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            // Create
            profile = new Profile(profileFields);

            await profile.save();

            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   PUT api/profiles/awards
// @desc    Add awards to profile
// @access  Private

router.put(
    '/awards',
    [auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty(),
            check('date', 'Date is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, date } = req.body;

        const newAwards = {
            title,
            description,
            date
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            if (!profile){
                res.status(400).json({'msg': 'Profile was not found'});
            }

            profile.awards.unshift(newAwards);

            await profile.save();

            res.json(profile);


        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   DELETE api/profiles/awards/:awards_id
// @desc    Delete award from profile
// @access  Private

router.delete('/awards/:award_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get the remove index
        const removeIndex = profile.awards.map(item => item.id).indexOf(req.params.award_id);

        profile.awards.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/profiles/videos
// @desc    Add video to profile
// @access  Private

router.put(
    '/videos',
    [auth,
        [
            check('link', 'Link is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { link, description } = req.body;

        const newVideo = {
            link,
            description
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            if (!profile){
                res.status(400).json({'msg': 'Profile was not found'});
            }

            profile.videos.unshift(newVideo);

            await profile.save();

            res.json(profile);


        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   DELETE api/profiles/videos/:video_id
// @desc    Delete video from profile
// @access  Private

router.delete('/videos/:video_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get the remove index
        const removeIndex = profile.videos.map(item => item.id).indexOf(req.params.video_id);

        profile.videos.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;