const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String, 
        required: true,
        unique: true
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
    price : {
        type: String,
        required: true
    },
    latest: {
        type: Boolean
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = Artwork = mongoose.model('artwork', ArtworkSchema);