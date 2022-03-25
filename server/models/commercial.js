const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeScheme = {
    type: String,
    required: true,
    set: t => {
        if (t instanceof Date)
            return t.toTimeString().split(' ')[0].replaceAll(':', '');
        return t;
    },
};

const Commercial = new Schema({
    name: {
        type: String,
        required: true,
    },
    screenId: {
        type: [Number],
        required: true,
    },
    messages: {
        type: [String],
        required: true,
        validate: m => m.length <= 10,
    },
    images: {
        type: [String],
        required: true,
        validate: m => m.length <= 5,
    },
    template: {
        type: Number,
        required: true,
    },
    durationInSeconds: {
        type: Number,
        required: true,
        min: 0,
    },
    timeSets: {
        type: [
            {
                startDate: {
                    type: Date,
                    required: true,
                },
                endDate: {
                    type: Date,
                    required: true,
                },
                startTime: TimeScheme,
                endTime: TimeScheme,
                daysInWeek: [Number],
            },
        ],
        required: true,
    },
});

module.exports = mongoose.model('commercials', Commercial);
