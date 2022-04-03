const mongoose = require("mongoose");

const client = new mongoose.Schema({
  id: Number,
  screenId: Number,
  connected: Date,
  disconnected: Date,
});

module.exports = mongoose.model("client", client);
