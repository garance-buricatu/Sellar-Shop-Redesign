const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String, 
        required: true
    },
    photoURL: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    medium: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Artwork = mongoose.model('artwork', ArtworkSchema);