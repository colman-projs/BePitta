const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dish = new Schema({
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
    },
    tags: {
        type: [{ type: Schema.Types.ObjectId, ref: 'tag' }],
    },
});

module.exports = mongoose.model('dish', Dish);
