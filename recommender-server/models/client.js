const mongoose = require('mongoose');

const Client = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    tags: {
        type: [String],
        required: true,
    },
    favoriteresturants: {
        type: [String],
    },
});

module.exports = mongoose.model('client', Client);
