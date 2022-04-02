const mongoose = require('mongoose');

const connectDB = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        dbName: 'BePitta',
    });
    //Get the default connection
    var db = mongoose.connection;

    console.log("Conntected TO ATLAS DB -> " + mongoose.connection.$dbName);

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};

module.exports = connectDB;
