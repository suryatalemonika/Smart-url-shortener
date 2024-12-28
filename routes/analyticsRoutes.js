const express = require('express');
const { getUrlAnalytics, getOverallAnalytics,getTopicAnalytics } = require('../controllers/analyticsController');
const router = express.Router();


router.get('/overall', getOverallAnalytics);
router.get('/:alias', getUrlAnalytics);
router.get('/topic/:topic',getTopicAnalytics)

module.exports = router;
