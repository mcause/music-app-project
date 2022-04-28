import React from 'react';
import AddSongs from './AddSong';
import AddArtist from './AddArtist'
import { getAllSongs } from './networkRequests';
import { getAllArtists } from './networkRequests';
import Song from './Song'

class Home extends React.Component {
    state = {
        songs: []
    }
    
    componentDidMount(){
        getAllSongs().then(res => {
            this.setState({ songs: res });
        });
    }
 
    render(){
        return (
            <div>
                <AddSongs />
                <AddArtist />
                <ul>
                    {this.state.songs.map(song => <li><Song key={song.id}/>{song.name}</li>)}
                </ul>
            </div>
        )
    }
}

export default Home;