const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Group = new Schema({
    name: {
        type: String,
        required: true,
    },
    resturantid: {
        type: string,
        required: true,
    },
    users: {
        type: [String],
        required: true,
    },
    state: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('restaurant', Restaurant);
