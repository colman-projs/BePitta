const mongoose = require('mongoose');

let _io;

const setIo = io => {
    _io = io;
};

const getIo = () => {
    return _io;
};

const errorHandler = res => err => {
    console.error(err);
    if (
        err instanceof mongoose.Error.ValidationError ||
        err instanceof mongoose.Error.CastError
    ) {
        res.status(400);
    } else {
        res.status(500);
    }

    res.send({ error: err.message });
};

const config = {
    recommenderServerUrl: 'http://localhost:3002',
};

module.exports = {
    errorHandler,
    setIo,
    getIo,
    config,
};
