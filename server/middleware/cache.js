const redis = require('./redis_client');

const client = redis.connect();

function novelInfoCache(req, res, next) {
  const { url } = req.body;

  client.hgetall(`novel:${url}`, (err, data) => {
    if (err) throw err;
    if (data != null) {
      const novelInfo = [data.title, data.coverUrl, data.author, data.type];
      res.send(novelInfo);
    } else {
      next();
    }
  });
}

module.exports = novelInfoCache;
