const mongoose = require('mongoose');
const { Schema } = mongoose;

const Client = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    tags: {
        type: [{ type: Schema.Types.ObjectId, ref: 'tag' }],
        required: true,
    },
    likedDishes: {
        type: [{ type: Schema.Types.ObjectId, ref: 'dish' }],
    },
    favoriteresturants: {
        type: [{ type: Schema.Types.ObjectId, ref: 'restaurant' }],
    },
});

module.exports = mongoose.model('client', Client);
