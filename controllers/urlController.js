const { UrlModel } = require('../models/Url');
const geoip = require('geoip-lite'); 
const redisClient  = require('../utils/redisClient')

exports.redirectShortUrl = async (req, res) => {
  try {
    const { alias } = req.params;

    const cachedUrl = await redisClient.get(alias);
    if (cachedUrl) {
      console.log('Cache hit: ', cachedUrl);
      return res.redirect(cachedUrl);
    }

    const url = await UrlModel.findOne({ shortUrl: alias });
    console.log('Database hit: ', url);

    if (!url) {
      return res.status(404).json({ message: 'Short URL not found in redirectShortUrl' });
    }

    const analyticsData = {
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
      geolocation: geoip.lookup(req.ip) || 'TBD',  
    };

    url.analytics.push(analyticsData);
    url.clicks += 1;

    await url.save();

    redisClient.set(alias, url.longUrl);

    res.redirect(url.longUrl);
  } catch (error) {
    console.log(`Error in redirectShortUrl:  ${error}`); 
    res.status(500).json({ message: `Server error ${error}` });
  }
};
