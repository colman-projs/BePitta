const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Group = new Schema({
    name: {
        type: String,
        required: true,
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true,
    },
    users: {
        type: [{ type: Schema.Types.ObjectId, ref: 'client' }],
        // required: true,
    },
    state: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('group', Group);
