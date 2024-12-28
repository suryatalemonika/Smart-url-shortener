const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  uniqueUsers: { type: Number, default: 0 },
  topic: { type: String, required: false }, 
  clicksByDate: [
    {
      date: { type: String }, 
      clickCount: { type: Number }
    }
  ],
  osType: [
    {
      osName: { type: String },
      uniqueClicks: { type: Number },
      uniqueUsers: { type: Number }
    }
  ],
  deviceType: [
    {
      deviceName: { type: String },
      uniqueClicks: { type: Number },
      uniqueUsers: { type: Number }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  analytics: [
    {
      ipAddress: { type: String },
      osName: { type: String },
      deviceName: { type: String },
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const UrlModel = mongoose.model('Url', urlSchema);

module.exports = {
  UrlModel
}