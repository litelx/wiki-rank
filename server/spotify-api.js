var request = require('request');

const client_id = '8a580779fb6e4fe299c09d86d48b83ec';
const client_secret = 'c844ed585cf646a4ad7ded3d3f7984f8';

const apiDomain = 'https://any-api.com';
const apiPort = 8443;
const apiURL = 'https://api.spotify.com/v1/artists';

module.exports = {
    getToken: async function () {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            form: {
                grant_type: 'client_credentials'
            },
            json: true
        };
        return new Promise((resolve, reject) => {
            request.post(authOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(body.access_token);
                }
                else {
                    reject(error);
                }
            });
        });
    },

    getAlbums: async function (artistId) {
        const token = await this.getToken();

        const url = `${apiDomain}:${apiPort}/${apiURL}/${artistId}/albums?limit=50&offset=0`;
    
        var options = {
            url: url,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
        };
        return new Promise((resolve, reject) => {
            request.get(options, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                }
                else {
                    reject(error);
                }
            });
        });
    }
}

