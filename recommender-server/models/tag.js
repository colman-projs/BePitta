const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tag = new Schema({
    value: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('tag', Tag);
