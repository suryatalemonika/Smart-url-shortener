const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60, 
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => next())
    .catch(() => res.status(429).json({ message: 'Too many requests, please try again later.' }));
};

module.exports = rateLimiterMiddleware;
