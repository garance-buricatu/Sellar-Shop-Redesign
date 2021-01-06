const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Seminar = require('../../models/Seminar');

// @route   POST api/seminars
// @desc    Create or edit seminar
// @access  Private

router.post(
    '/', 
    [
        auth, 
            [
                check('name', 'Name of seminar is required').not().isEmpty(),
                check('project', 'Project of seminar is required').not().isEmpty(),
                check('details', 'Details of seminar are required').not().isEmpty(),
                check('dateOfEvent', 'Date of seminar is required').not().isEmpty()
            ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            photoURL,
            location,
            project,
            details,
            difficulty,
            dateOfEvent
        } = req.body;

        // Build a seminar object
        const seminarFields = {};
        seminarFields.user = req.user.id;

        if (name) seminarFields.name = name;
        if (photoURL) seminarFields.photoURL = photoURL;
        if (location) seminarFields.location = location;
        if (project) seminarFields.project = project;
        if (details) seminarFields.details = details;
        if (difficulty) seminarFields.difficulty = difficulty;
        if (dateOfEvent) seminarFields.dateOfEvent = dateOfEvent;

        try {
            let seminar = new Seminar(seminarFields);

            await seminar.save();

            res.send(seminar);


        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   PUT api/seminars/:seminar_id
// @desc    Edit seminar by ID
// @access  Private

// @route   GET api/seminars/:seminar_id
// @desc    Get seminar by ID
// @access  Public

// @route   GET api/seminars/
// @desc    Get all seminars
// @access  Public

// @route   DELETE api/seminars/:seminar_id
// @desc    Delete seminar by ID
// @access  Private

module.exports = router;