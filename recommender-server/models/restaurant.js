const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Restaurant = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: m => m.length <= 5,
    },
    dishes: {
        type: [String],
        required: true,
    },
});

module.exports = mongoose.model('restaurant', Restaurant);
