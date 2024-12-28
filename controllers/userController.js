const {UrlModel} = require('../models/Url');
const redisClient = require('../utils/redisClient');
const { nanoid } = require('nanoid');



exports.createShortUrl = async (req, res) => {
  try {
    const { longUrl, customAlias, topic } = req.body;
    const shortUrl = customAlias || nanoid(); 

    const existingUrl = await UrlModel.findOne({ shortUrl });
    if (existingUrl) {
      return res.status(400).json({ message: 'Alias already in use' });
    }

    const newUrl = await UrlModel.create({ longUrl, shortUrl, customAlias, topic });
    redisClient.set(shortUrl, longUrl);

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortUrl}`,
      createdAt: newUrl.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};