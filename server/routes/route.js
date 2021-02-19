const express = require('express');
const router = express.Router();

const spotifyApi = require('../spotify-api');

const artistId = '0du5cEVh5yTK9QJze8zA0C';


router.post('/search', async (req, res, next) => {
    const albums = await spotifyApi.getAlbums(artistId);
    res.json(albums);
});

module.exports = router;
