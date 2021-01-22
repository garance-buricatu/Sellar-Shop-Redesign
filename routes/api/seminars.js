const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Seminar = require('../../models/Seminar');

// @route   POST api/seminars
// @desc    Create seminar
// @access  Private

router.post(
    '/', 
    [
        auth, 
            [
                check('project', 'Project of seminar is required').not().isEmpty(),
                check('details', 'Details of seminar are required').not().isEmpty(),
                check('startTime', 'Start time of seminar is required').not().isEmpty(),
                check('endTime', 'End time of seminar is required').not().isEmpty(),
                check('dateOfEvent', 'Date of seminar is required').not().isEmpty()
            ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            photoURL,
            location,
            project,
            details,
            difficulty,
            startTime,
            endTime,
            dateOfEvent,
            recurring
        } = req.body;

        // Build a seminar object
        const seminarFields = {};
        seminarFields.user = req.user.id;

        if (photoURL) seminarFields.photoURL = photoURL;
        if (location) seminarFields.location = location;
        if (project) seminarFields.project = project;
        if (details) seminarFields.details = details;
        if (difficulty) seminarFields.difficulty = difficulty;
        if (startTime) seminarFields.startTime = startTime;
        if (endTime) seminarFields.endTime = endTime;
        if (dateOfEvent) seminarFields.dateOfEvent = dateOfEvent;
        if (recurring) seminarFields.recurring = recurring;

        try {
            let seminar = new Seminar(seminarFields);

            await seminar.save();

            res.send(seminar);


        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/seminars/
// @desc    Get all seminars
// @access  Public

router.get('/', async (req, res) => {
    try {

        const seminars = await Seminar.find().populate('user', ['name']);
        res.json(seminars);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/seminars/:seminar_id
// @desc    Edit seminar by ID
// @access  Private

// @route   GET api/seminars/:seminar_id
// @desc    Get seminar by ID
// @access  Public

router.get('/:seminar_id', async (req, res) => {
    try {

        const seminar = await Seminar.findById(req.params.seminar_id).populate('user', ['name']);
        
        if (!seminar) return res.status(400).json({ msg: 'Seminar not found' });

        res.json(seminar);
        
    } catch (err) {
        if (err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Seminar not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/seminars/:seminar_id
// @desc    Delete seminar by ID
// @access  Private

router.delete('/:seminar_id', auth, async (req, res) => {
    try {
        await Seminar.findByIdAndDelete(req.params.seminar_id);

        res.json({ msg: 'Seminar deleted'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;