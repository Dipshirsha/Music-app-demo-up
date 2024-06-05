import React, { useEffect, useState } from "react";
import Homesong from "./Homesong";
import Search from "./Search";
import {  collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { txtDB } from "./config/firebase.config";
import Song from "./Song";
import './Home.css'

export default function Home(props) {
  const [song, setSong] = useState([]);
  const [dataOfperticularSongandTotal, setDataOfperticularSongandTotal] = useState([]);


  const getData = async () => {
    const valRef = collection(txtDB, 'txtData');
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map(val => ({ ...val.data(), id: val.id }));
    setSong(allData);
  };





  const handleDataFromHomesong = (data) => {
    setDataOfperticularSongandTotal(data);
  };


  const handlePlaylistAdd = async (data) => {
    if (data) {
      if(props.userDetails.playlist.indexOf(data)===(-1)){
      props.userDetails.playlist.push(data);
      console.log(props.userDetails.playlist)
      try {
        await updateDoc(doc(txtDB, "Users", props.userUid), {
          playlist: props.userDetails.playlist,
        });
        alert("Song added to Playlist")
      }
      catch (e) {
        alert("Some technical issue occured")
      }
    }
    else{
      alert("song already present")
    }

    }
    else {
      console.log("there are some technical issue")
    }

  }





  function checkArrayEmpty(arr) {
    return arr.length === 0;
  }






  useEffect(() => {
    getData();

  }, []); // Ensure useEffect runs only once

  return (
    <div>

      {checkArrayEmpty(song) ? <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-8 h-8 bg-red-600 rounded-full animate-bounce"></div>
          <div className="w-8 h-8 bg-yellow-600 rounded-full animate-bounce"></div>
        </div>
      </div> :
        <div className="home-container">
          {props.userDetails === null ? <h1>Hello User</h1> : <h2 className="text-xl">Hello, {props.userDetails.name}</h2>}
          <br />


          <div>

            <Search song={song} handleDataFromHomesong={handleDataFromHomesong} />
            <br />
            <h4>Songs</h4>
            <br />

            Sad Song

            <div className="songs-container ">
              {song.map((data) => (
                <Homesong
                  songid={data.id}
                  data={data}
                  song={song}
                  handleDataFromHomesong={handleDataFromHomesong}
                  type="sad" // Ensure the correct prop name
                  handlePlaylistAdd={handlePlaylistAdd}
                />
              ))}
            </div>

            Romance
            <div className="songs-container ">
              {song.map((data) => (
                <Homesong
                  songid={data.id}
                  data={data}
                  song={song}
                  type="romance"
                  handleDataFromHomesong={handleDataFromHomesong}
                  handlePlaylistAdd={handlePlaylistAdd} // Ensure the correct prop name
                />
              ))}
            </div>
            <div className="fixed bottom-0 ">
              {dataOfperticularSongandTotal.length > 0 ? (
                <Song songData={dataOfperticularSongandTotal} />
              ) : (
                <Song songData={song} />
              )}
            </div>

            <div className="extra-height">

            </div>
          </div>



        </div>

      }
    </div>
  );
}
