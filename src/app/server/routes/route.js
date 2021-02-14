const rp = require('request-promise');
const express = require('express');
const router = express.Router();


router.post('/search', async (req, res, next) => {
    const searchItem = req.body.search;
    const url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles="

    const options = {
        method: 'POST',
        uri: url + searchItem,
        json: true,
        headers: { 'Content-Type': 'application/json' }
    };

    const topCommon = await rp(options)
        .then(function (parsedBody) {
            
            // Getting the extract plain text
            let extract = parsedBody.query.pages[Object.keys(parsedBody.query.pages)[0]].extract;
            // Remove tag text
            extract = extract.replace(/(<([^>]+)>)/gi, "").toLowerCase();
            // Get only the words without the punctuation marks
            const words = extract.match(/([a-zA-Z]+)/g);

            const ranks = {};
            words.forEach(word => {
                if (ranks[word]) {
                    ranks[word]++
                } else {
                    ranks[word] = 1;
                }
            });

            const list = [];
            Object.keys(ranks).forEach(rank => {
                list.push({ word: rank, amount: ranks[rank] })
            });

            const sortedList = list.sort(function (a, b) {
                if (b.amount - a.amount == 0) 
                    return a.word > b.word ? 1 : -1;
                return b.amount - a.amount;
            });
            return sortedList;
        })
        .catch(function (err) {
            console.error(err);
        });

    let cs = 5;
    let lastValue = topCommon[0].amount;
    for (let i = 0; i < topCommon.length; i++) {
        if (topCommon[i].amount < lastValue && cs > 1) {
            cs--;
        }
        lastValue = topCommon[i].amount
        topCommon[i]['star'] = '*'.repeat(cs)
    }
    const topCommonSorted = topCommon.sort(function (a, b) {
        if (b.star.length - a.star.length == 0) 
            return a.word > b.word ? 1 : -1;
        return b.star.length - a.star.length;
    });

    res.json(topCommonSorted);
});


module.exports = router;
