const cheerio = require('cheerio');
const request = require('request');

const getLists = (userID, res) => {
    const form = {action: 'nu_prevew',pagenum: -1,intUserID: userID};
    const options = { 
        url: 'https://www.novelupdates.com/wp-admin/admin-ajax.php',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1'
        },
        form: form
    };

    let lists = [];
    request(options, (error, response, body) => {
        const newBody = JSON.parse(body.slice(0, body.length-1));
        let $ = cheerio.load(newBody.menu);
        const data = $('.am_mn');
        for(let i=0; i<data.length; i++) {
            const listName = data.eq(i).text();
            lists.push({
                name: listName,
                position: i
            })
        }
        res.send(lists);
    });
}

module.exports = getLists;