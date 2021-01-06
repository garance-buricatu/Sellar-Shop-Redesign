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
                type: Date,
                deafult: Date.now
            }
        }
    ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);