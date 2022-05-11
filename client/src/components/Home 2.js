import React, { useEffect, useState } from 'react';
import AddSongs from './AddSong';
import AddArtists from './AddArtist';
import { getAllSongs } from './networkRequests';
import Song from './Song' 

export default function Home(){
    const [songs, setSongs] = useState([]);
    const refresh = () => {
        getAllSongs().then(res => {
            setSongs(res);
        });
    }
    useEffect(refresh, []);

    return (
        <div>
            <AddSongs refresh={refresh}/>
            <AddArtists refresh={refresh}/>
            <ul className='song-card-container'>
                {songs.map(song => <Song song={song} key={song.id} refresh={refresh}/>)}
            </ul>
        </div>
    )
}