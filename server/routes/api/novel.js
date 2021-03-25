const express = require('express');
const getInfo = require('./scripts/fetchInfo');
const getLists = require('./scripts/fetchLists');
const getListsNovels = require('./scripts/fetchListsNovels');
const router = express.Router();

//const novelInfoCache = require('../../middleware/cache');


//Get novel info
router.post('/', async (req, res) => {
    const url = req.body.url;
    if (url) {
        getInfo(url)
        .then(info => res.send(info))
        .catch(err => {
            console.log("ERROR: " + url);
            console.log(err);
        })
    }
});

router.post('/lists', async (req, res) => {
    const userID = req.body.userID;
    getLists(userID, res);
})

router.post('/lists/data', async (req, res) => {
    const uid = req.body.uid;
    const lists = req.body.lists;
    getListsNovels(uid, lists)
    .then(listData => res.send(listData))
})


module.exports = router;











