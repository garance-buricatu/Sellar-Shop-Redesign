const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config'); // to obtain jwtSecret
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   POST api/users
// @desc    Add a User
// @access  Public

router.post('/', 
[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Invalid Credentials').equals('TEMP_PASS'),
], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { name, email, password, userType } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if(user) {
            res.status(400).json({errors: [{ msg: 'User already exists' }]});
        }

        // Get user's gravatar
        const avatar = gravatar.url(email, {
            s: '200', // deafult size
            r: 'pg', // rating
            d: 'mm' // deafult
        });

        user = new User({
            name,
            email,
            password,
            userType,
            avatar
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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

// @route   POST api/users/setPassword
// @desc    Set Own Password
// @access  Private
router.post(
    '/setPassword', 
    [auth,
        [check('password', 'Please enter a password with 6 or more characters').isLength({ min:6 })]
    ],  
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }

        const { password } = req.body;

        try {
            const user = await User.findById(req.user.id);

            if (user) {

                const isMatch = await bcrypt.compare(
                    password, // password that user enters (in request) 
                    user.password // password of user found in database
                );
                if (isMatch) {
                    return res.status(400).json({ errors: [{ msg: 'Cannot use default password.' }] });
                }

                // Encrypt new password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);

                // Save user
                await user.save();

                return res.json({msg: 'Password has been changed'});
            }
            else {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }

        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});


module.exports = router;