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
            extract = extract.replace(/(<([^>]+)>)/gi, "");
            // Get only the words without the punctuation marks
            const words = extract.match(/(\w+)/g);

            const ranks = {};
            words.forEach(word => {
                const lowerCaseWord = word.toLowerCase();
                // Remove some trasition or connection words
                if (!connectionWordsCommon.includes(lowerCaseWord)) {
                    if (ranks[lowerCaseWord]) {
                        ranks[lowerCaseWord]++
                    } else {
                        ranks[lowerCaseWord] = 1;
                    }
                }
            });

            const list = []
            Object.keys(ranks).forEach(rank => {
                list.push({ word: rank, amount: ranks[rank] })
            });

            const sortedList = list.sort(function (a, b) {
                return b.amount - a.amount;
            })
            return sortedList.slice(0, 5);
        })
        .catch(function (err) {
            console.error(err);
        });

    let cs = 5;
    let lastValue = topCommon[0].amount;
    for (let i = 0; i < topCommon.length; i++) {
        if (topCommon[i].amount < lastValue) {
            cs--;
        }
        lastValue = topCommon[i].amount
        topCommon[i]['star'] = '*'.repeat(cs)
    }
    res.json(topCommon);
});

// some trasition or connection popular words
const connectionWordsCommon = ['of', 'a', 'an', 'on', 'the', 'and', 'are', 'is', 'to', 'in', 's'];
// const connectionWordsCommon = [];

module.exports = router;
