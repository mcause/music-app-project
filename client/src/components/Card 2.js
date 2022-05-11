import {useState} from 'react'; 

export default SongCard(propd){
    sont {song} = props;
    const [data, setData] = useState();
    const [editing, setEditing] = useState(false );
    const toggleEdit = () => setEditing (!editing);
 
    return(
        <li key= {song.id} onClick={toggleEdit}>
    
        <img className='mini' src={song.img} alt={song.name}/>
        {song.name}
        {editing && <>
            <h1>We are in edit mode</h1>
            <button onClick= {updateSongClick}>Submit</button>
            
        }
        </li>

        </li>
    )
}