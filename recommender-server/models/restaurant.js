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
    imageurl: {
        type: String,
        required: true,
    },
    dishes: {
        type: [{ type: Schema.Types.ObjectId, ref: 'dish' }],
    },
});

module.exports = mongoose.model('restaurant', Restaurant);
