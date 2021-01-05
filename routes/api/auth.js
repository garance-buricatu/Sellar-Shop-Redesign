const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config'); // to obtain jwtSecret
const bcrypt = require('bcryptjs');


const User = require('../../models/User');

// @route   GET api/auth
// @desc    Authentiate user --> return user object based on authenticated token
// @access  Private

router.get('/', auth, async (req, res) => {
    try {
        // remember: payload of token contains the user id
        const user = await User.findById(req.user.id).select('-password'); // retruns user without password
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Login User --> return user's token
// @access  Public

router.post('/', 
[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if(!user) {
            res.status(400).json({errors: [{ msg: 'Invalid Credentials' }]});
        }
 
        // Make usre password matches with found user (using bcrypt's compare method)
        const isMatch = await bcrypt.compare(
            password, // password that user enters (in request) 
            user.password // password of user found in database
        );

        if (!isMatch) {
            res.status(400).json({errors: [{ msg: 'Invalid Credentials' }]});
        }

        // Return the json web token

        const payload = {
            user: {
                id: user.id //represents _id of the user that was just saved
            }
        };

        jwt.sign(
            payload, // payload of json web token is always user.id corresponding to the user that was just created
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token }) // send token
            }
          );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;