const mongoose = require('mongoose');
const { Schema } = mongoose;

const Client = new mongoose.Schema({
    googleId: {
        type: String,
        // required: true,
    },
    tags: {
        type: [{ type: Schema.Types.ObjectId, ref: 'tag' }],
        // required: true,
    },
    favoriteresturants: {
        type: [{ type: Schema.Types.ObjectId, ref: 'restaurant' }],
    },
    isReady: {
        type: Boolean,
    },
});

module.exports = mongoose.model('client', Client);
