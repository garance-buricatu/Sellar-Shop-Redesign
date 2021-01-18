const mongoose = require('mongoose');

const SeminarSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    dateOfEvent: {
        type: Date,
        required: true,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    },
    recurring : {
        type: Boolean,
        default: false
    }
});

module.exports = Seminar = mongoose.model('seminar', SeminarSchema);