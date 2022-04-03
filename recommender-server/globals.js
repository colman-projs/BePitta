const mongoose = require('mongoose');

let _io;

const setIo = (io) => {
    _io = io;
}

const getIo = () => {
    return _io;
}

const errorHandler = (res) => (err) => {
    console.error(err);
    if (err instanceof mongoose.Error.ValidationError) {
        res.status(400);
    } else {
        res.status(500);
    }

    res.send({ error: err.message });
};

module.exports = {
    errorHandler,
    setIo,
    getIo
};
