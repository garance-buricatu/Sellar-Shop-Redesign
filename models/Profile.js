const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    description: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    awards: [
        {
            title : {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            }
        }
    ],
    videos : [
        {
            link : {
                type: String,
                required: true
            },
            description: {
                type: String
            }
        }
    ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);