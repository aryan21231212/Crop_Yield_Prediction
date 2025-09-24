const mongoose = require('mongoose');

const yieldHistorySchema = new mongoose.Schema({
  cropType: {
    type: String,
    required: true,
    enum: ['wheat', 'corn', 'rice', 'soybean', 'barley']
  },
  yieldAmount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  weatherConditions: {
    temperature: Number,
    rainfall: Number,
    humidity: Number
  },
  soilQuality: {
    type: String,
    enum: ['poor', 'average', 'good', 'excellent']
  },
  irrigationAmount: Number,
  farmSize: Number,
  location: {
    city: String,
    state: String,
    country: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('YieldHistory', yieldHistorySchema);