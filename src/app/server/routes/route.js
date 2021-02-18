var request = require('request'); // "Request" library
const express = require('express');
const router = express.Router();

var client_id = '8a580779fb6e4fe299c09d86d48b83ec';
var client_secret = 'c844ed585cf646a4ad7ded3d3f7984f8';


router.post('/search', async (req, res, next) => {

    // your application requests authorization
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    const reponse = request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            // use the access token to access the Spotify Web API
            var token = body.access_token;
            const url = `${apiDomain}:${apiPort}/${apiURL}/${artistId}/albums?limit=50&offset=0`;

            var options = {
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function (error, response, body) {
                res.json(body);
            });
        }
    });
});

const apiDomain = 'https://any-api.com';
const apiPort = 8443;
const apiURL = 'https://api.spotify.com/v1/artists';

const artistId = '0du5cEVh5yTK9QJze8zA0C';

module.exports = router;
