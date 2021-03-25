const cheerio = require('cheerio');
const request = require('request-promise');

const getListsNovels = async (UID, lists) => {
  const listData = [];
  let counter = 0;
  await asyncForEach(lists, async (list) => {
    const form = { action: 'nu_prevew', pagenum: list.num, intUserID: UID };
    const options = {
      url: 'https://www.novelupdates.com/wp-admin/admin-ajax.php',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1',
      },
      form,
    };
    listData.push({
      listName: list.target,
      novels: [],
    });

    await request(options, (error, response, body) => {
      const newBody = JSON.parse(body.slice(0, body.length - 1));
      const $ = cheerio.load(newBody.data);
      const count = $('td').children('a').length * 5;
      for (let i = 1; i < count; i += 5) {
        const link = $('td').eq(i).children('a').attr('href');
        if (!link) console.log($('td').eq(i).html());
        const progress = $('td').eq(i + 1).children('span').text();
        const novel = { url: link, progress };
        listData[counter].novels.push(novel);
      }
      counter++;
    });
  });
  return listData;
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = getListsNovels;
