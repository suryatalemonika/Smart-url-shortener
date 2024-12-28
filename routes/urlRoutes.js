const express = require('express');
const { redirectShortUrl } = require('../controllers/urlController');
const { createShortUrl } = require('../controllers/userController');

const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/:alias', redirectShortUrl);

module.exports = router;
