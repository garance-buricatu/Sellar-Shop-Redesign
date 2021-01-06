const mongoose = require('mongoose');

const SeminarSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String, 
        required: true
    },
    photoURL: {
        type: String
    },
    location: {
        type: String
    },
    project: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    dateOfEvent: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Seminar = mongoose.model('seminar', SeminarSchema);