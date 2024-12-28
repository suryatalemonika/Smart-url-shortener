const { RateLimiteryMemory } = require('rate-limiter-flexible');


const rules = new RateLimiteryMemory({
    points: 10,
    duration: 60 * 60
})

module.exports = {
    rules
}