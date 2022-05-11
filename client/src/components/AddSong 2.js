import React, { useEffect, useState } from 'react';
import { addSong } from './networkRequests';
import { getAllArtists } from './networkRequests';


// class AddSong extends React.Component {
export default function AddSong(props) {
    const [state, setState] = useState({
        name: "",
        artistId: "",
        duration: "",
        play_count: "",
        img: ""
    });

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        getAllArtists().then(res => {
            setArtists(res);
        });
    }, [])

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    //run
    const submitSong = () => {
        addSong(state)
            .then(refresh);
    }
    const refresh = () => {
        setState({
            name: "",
            artistId: "",
            duration: "",
            play_count: "",
            img: ""
        });
        //props are attributes passed from parent components into child components
        //after submitting a new song we need the user list of songs to update so theucan see the new song 
        props.refresh();
    }

    //Fetch request - getAllArtist in useEffect - reference the refresh function in Home.js(fetchAllSongs )
    //set the artist array to a hook 
    //map over artist array and create an option for each artist object
    //text = artist.name/value =artist.id
    return (
        <div className="add-song-wrap">
            <h1>Add Song!</h1>
            {/*Need to use state because thats where the data is Array.map */}
            {Object.keys(state).map(key => {
                if(key === 'artistId'){
                    return(
                        <>
                    <label>Artists</label>
                    <select onChange={handleChange} name='artistId' value={state.artistId}>
                    {artists.map(artist => {
                    return <option value={artist.id}>{artist.name}</option>
                })}
                </select>
                </>
                )
            }else{
            return (
                <>
                    <label>{key}</label>
                    <input onChange={handleChange} name={key} value={state[key]}></input>
                </>
                )
                }
            })}
            <button onClick={submitSong}>Submit</button>
        </div>
    )
}
