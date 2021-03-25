const cheerio = require('cheerio');
const fetch = require('node-fetch');

/*
TODO: Integrate redis cache
const redis = require('../../../middleware/redis_client');
const client = redis.connect();
*/

const getInfo = async (url) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const title = $('.seriestitlenu').text().replace('’', "'");
  const coverUrl = $('.seriesimg').children('img').attr('src');
  const author = $('#authtag').text();
  const type = $('#showtype').children().first().next()
    .text()
    .replace(/\(|\)/g, '');
  const data = [title, coverUrl, author, type];

  /*
    TODO: Integrate redis cache
    client.hmset("novel:"+url,
    "title", title,
    "coverUrl", coverUrl,
    "author", author,
    "type", type);
    client.expire("novel:"+url, 86000);
    */

  return data;
};

module.exports = getInfo;
