const mongoose = require('mongoose');
const { Schema } = mongoose;

const Client = new mongoose.Schema({
    googleId: {
        type: String,
    },
    tags: {
        type: [{ type: Schema.Types.ObjectId, ref: 'tag' }],
    },
    likedDishes: {
        type: [{ type: Schema.Types.ObjectId, ref: 'dish' }],
    },
});

module.exports = mongoose.model('client', Client);
