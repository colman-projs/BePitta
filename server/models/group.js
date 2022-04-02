const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Group = new Schema({
    name: {
        type: String,
        required: true,
    },
    restaurantId: {
        type: String,
        required: true,
    },
    users: {
        type: [String],
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('group', Group);
