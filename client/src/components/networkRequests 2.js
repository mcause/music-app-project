//const apiEndpoint = 'http://localhost:3030'
const apiEndpoint = 'https://dx0n1uhyofkh1.cloudfront.net/'

export const getAllSongs = async () => {
    // const songs = await fetch("http://ec2-3-95-222-148.compute-1.amazonaws.com:3030/songs");
    console.log("good to go??")
    const songs = await fetch(`${apiEndpoint}/songs`);
    return songs.json();
}

export const getAllArtists = async () => {
    // const songs = await fetch("http://ec2-3-95-222-148.compute-1.amazonaws.com:3030/artists");
    console.log("is this an artist??")
    const songs = await fetch(`${apiEndpoint}/artist`);
    return songs.json();
}
export const addSong = async (song) => {
    try {
        const holdResponse = await fetch(`${apiEndpoint}/songs`, {
        //const holdResponse = await fetch("https://djk20s64zxqr7.cloudfront.net/songs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //converts it to a string and turns it to a JSON object 
            body: JSON.stringify(song)
        });
        return holdResponse;

    } catch(error){
        console.log("Caught Error!! " + error)
    }
}

export const addArtist = async (artists) => {
    try {
        const holdResponse = await fetch(`${apiEndpoint}/artist`, {
        //const holdResponse = await fetch("https://djk20s64zxqr7.cloudfront.net/artists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //converts it to a string and turns it to a JSON object 
            body: JSON.stringify(artists)
        });
        return holdResponse;

    } catch(error){
        console.log("Caught Error!! " + error)
    }
    export const updateRowInTblkeById = async (table,data) =>
}