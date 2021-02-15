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
    instructor: {
        type: String
    },
    details: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
    },
    seminarDates : [
       { 
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
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Seminar = mongoose.model('seminar', SeminarSchema);