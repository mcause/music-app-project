require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./queries.js');
const port = 3030;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ info: "Hello there"});
})

app.get('/songs', db.getAllSongs);
//Send a post request to the /songs using the quierries file containing the add song function 
app.post('/songs', db.addSong);

app.get('/artists', db.getAllArtists);

app.post('/artists', db.addArtist);


app.delete('/songs/:name', db.deleteSongById);

app.put('/songs/:name', db.updateSongNameById);

app.listen(port, () => {
    console.log(`App running on ${port}...`)
});