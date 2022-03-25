const mongoose = require('mongoose');

const connectDB = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        dbName: 'AdvProg',
    });
    console.log('Connected to ATLAS DB');

    //Get the default connection
    var db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};

module.exports = connectDB;
