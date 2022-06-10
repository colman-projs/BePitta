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
    likedDishes: {
        type: [{ type: Schema.Types.ObjectId, ref: 'dish' }],
    },
});

module.exports = mongoose.model('client', Client);
