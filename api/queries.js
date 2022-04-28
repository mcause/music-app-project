const Pool = require('pg').Pool;

const pool = new Pool({
    // user: 'postgres',
    // host: 'localhost',
    // //host: 'music.c7xclwu5il92.us-east-1.rds.amazonaws.com',
    // database: 'music',
    // password: 'postgres',
    // port: 5432
    connectionString: process.env.PSQL_CONNECTION 
});

const getAllSongs = (req, res) => {
    pool.query('SELECT * FROM songs', (error, result) => {
        if(error){
            throw error;
        }
        res.status(200).json(result.rows);
    })
}

const addSong = (req, res) => {
    try {
        const { name, artistId, duration, play_count, img } = req.body;
        pool.query(
            `INSERT INTO songs (name, artistId, duration, play_count, img) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, artistId, duration, play_count, img],
            (error, results) => {
                if (error) {
                    console.log(error, '<--- error here')
                    throw error;
                }
                console.log(results, "<--- result!")
                res.status(200).json(results.rows)
            }
        );
    } catch (e) {
        console.log("ERROR CAUGHT! " + err.message)
    }
};

const getAllArtists = (req, res) => {
    pool.query('SELECT * FROM artists', (error, result) => {
        if(error){
            throw error;
        }
        //make sure we get a good request and convert to json and return the results in row
        res.status(200).json(result.rows);
    })
}

const addArtist = (req, res) => {
    try {
        //creating a body object and passing through 3 values 
        const { name, age, img } = req.body;

        pool.query(
            `INSERT INTO artists (name, age, img) VALUES ($1, $2, $3) RETURNING *`,
            [ name, age, img],
            (error, results) => {
                if (error) {
                    console.log(error, '<--- error here')
                    throw error;
                }
                console.log(results, "<--- result!")
                res.status(200).json(results.rows)
            }
        );
    } catch (e) {
        console.log("ERROR CAUGHT! " + err.message)
    }
};

const deleteSongById = (req, res) => {
    const song_id = parseInt(req.params.song_id);

    pool.query(`DELETE FROM songs WHERE song_id=${song_id}`, (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const updateSongNameById = (req, res) => {
    const { song_id } = req.params;
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    // Adding to our UPDATE sql statement
    const configureString = () => {
        // Building the column / value pairs after our SET keyword 
        let sqlStatement = '';
        // Iterating over our keys from our request body and building our sqlStatement
        for(let i = 0; i < keys.length; i++){
            // If we are looking at the last key, we want to omit the comma...
            if(i === keys.length-1) sqlStatement += `${keys[i]}=$${i+1}`
            // ... otherwise, we want to add it because there are more column/value pairs
            else sqlStatement += `${keys[i]}=$${i+1}, `
        }
        return sqlStatement;
    }

    pool.query(
        `UPDATE songs SET ${configureString()} WHERE song_id=$${keys.length+1}`,
        [...values, song_id],
        (error, results) => {
            if(error){
                throw error;
            }
            res.status(200).json(results.rows);
        }
    )
}

module.exports = {
    addSong,
    getAllSongs,
    getAllArtists,
    deleteSongById,
    updateSongNameById,
    addArtist
}