const { UrlModel } = require('../models/Url')
exports.getUrlAnalytics = async (req, res) => {
  try {
    const { alias } = req.params;

    const url = await UrlModel.findOne({ shortUrl: alias });
    if (!url) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    const totalClicks = url.clicks;

    const uniqueUsers = new Set(url.analytics.map((log) => log.ipAddress)).size;

    const clicksByDate = url.analytics.reduce((acc, log) => {
      const date = new Date(log.timestamp).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const osType = url.osType.map((os) => {
      const uniqueClicks = os.uniqueClicks;
      const uniqueUsers = os.uniqueUsers;
      return {
        osName: os.osName,
        uniqueClicks,
        uniqueUsers,
      };
    });

    const deviceType = url.deviceType.map((device) => {
      const uniqueClicks = device.uniqueClicks;
      const uniqueUsers = device.uniqueUsers;
      return {
        deviceName: device.deviceName,
        uniqueClicks,
        uniqueUsers,
      };
    });

    res.status(200).json({
      totalClicks,
      uniqueUsers,
      clicksByDate: Object.entries(clicksByDate).map(([date, count]) => ({ date, count })),
      osType,
      deviceType,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOverallAnalytics = async (req, res) => {
  try {
    const urls = await UrlModel.find();
    const totalUrls = urls.length;
    const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);

    const uniqueUsers = new Set(
      urls.flatMap((url) => url.analytics.map((log) => log.ipAddress))
    ).size;

    const clicksByDate = urls.flatMap((url) => url.analytics).reduce((acc, log) => {
      const date = new Date(log.timestamp).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const osType = urls.flatMap((url) => url.osType).reduce((acc, os) => {
      acc[os.osName] = acc[os.osName] || { uniqueClicks: 0, uniqueUsers: 0 };
      acc[os.osName].uniqueClicks += os.uniqueClicks;
      acc[os.osName].uniqueUsers += os.uniqueUsers;
      return acc;
    }, {});

    const deviceType = urls.flatMap((url) => url.deviceType).reduce((acc, device) => {
      acc[device.deviceName] = acc[device.deviceName] || { uniqueClicks: 0, uniqueUsers: 0 };
      acc[device.deviceName].uniqueClicks += device.uniqueClicks;
      acc[device.deviceName].uniqueUsers += device.uniqueUsers;
      return acc;
    }, {});

    res.status(200).json({
      totalUrls,
      totalClicks,
      uniqueUsers,
      clicksByDate: Object.entries(clicksByDate).map(([date, count]) => ({ date, count })),
      osType: osType,
      deviceType: deviceType
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getTopicAnalytics = async (req, res) => {
  try {
    const { topic } = req.params;

    const urls = await UrlModel.find({ topic });

    if (!urls.length) {
      return res.status(404).json({ message: `No URLs found for topic: ${topic}` });
    }

    const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);

    const uniqueUsers = new Set(
      urls.flatMap((url) => url.analytics.map((log) => log.ipAddress))
    ).size;

    const clicksByDate = urls.flatMap((url) => url.analytics).reduce((acc, log) => {
      const date = new Date(log.timestamp).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({
      totalClicks,
      uniqueUsers,
      clicksByDate: Object.entries(clicksByDate).map(([date, count]) => ({ date, count })),
      urls: urls.map((url) => ({
        shortUrl: url.shortUrl,
        totalClicks: url.clicks,
        uniqueUsers: new Set(url.analytics.map((log) => log.ipAddress)).size,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

