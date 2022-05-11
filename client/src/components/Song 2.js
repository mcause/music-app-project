
export default const Song = (props) => {
    return (
<li key={song.id}>
<img className='mini' src={song.img} alt={song.name}/>
{song.name}
</li>
    )
};