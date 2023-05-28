const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const statusSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
});
const packageSchema = new Schema({
  guideNumber: {
    type: String,
    required: true,
    unique: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  statusList: [statusSchema],
});

const packageModel = mongoose.model("Package", packageSchema);

module.exports = packageModel;
