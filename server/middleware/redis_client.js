const redis = require('redis');

const REDIS_PORT = process.env.PORT || 6379;

module.exports.connect = cb => {
    return redis.createClient(REDIS_PORT);
}