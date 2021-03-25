const redis = require('redis');

const REDIS_PORT = process.env.PORT || 6379;

module.exports.connect = (cb) => redis.createClient(REDIS_PORT);
