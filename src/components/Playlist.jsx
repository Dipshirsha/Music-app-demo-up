import React, { useState, useEffect, useCallback } from 'react';
import './Song.css';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { txtDB } from './config/firebase.config';
import Playlistsong from './Playlistsong';
import Song from './Song';

export default function Playlist(props) {
  const [playlist, setPlaylist] = useState([]);
  const [onClickSong, setOnClickSong] = useState([]);

  const getPlaylistData = useCallback(async () => {
    if (props.userDetails && props.userDetails.playlist) {
      try {
        const playlistArray = [];
        for (let i = 0; i < props.userDetails.playlist.length; i++) {
          const docRef = doc(txtDB, 'txtData', props.userDetails.playlist[i]);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            playlistArray.push({ ...docSnap.data(), id: props.userDetails.playlist[i] });
          } else {
            console.log('Document does not exist:', props.userDetails.playlist[i]);
          }
        }
        setPlaylist(playlistArray);
      } catch (error) {
        console.error('Error fetching playlist data:', error);
      }
    }
  }, [props.userDetails]);

  const handleDataFromPlaylistsong = (data) => {
    setOnClickSong(data);
  };

  function checkArrayEmpty(arr) {
    return arr.length === 0;
  }

  const handlePlaylistRemove = async (data) => {
    if (data) {
      const updatedPlaylist = props.userDetails.playlist.filter((item) => item !== data);
      props.userDetails.playlist = updatedPlaylist;
      try {
        await updateDoc(doc(txtDB, 'Users', props.userUid), {
          playlist: updatedPlaylist,
        });
        alert('Song removed from Playlist');
        getPlaylistData(); // Ensure playlist data is updated after removing a song
      } catch (e) {
        alert('Some technical issue occurred');
      }
    } else {
      console.log('There is some technical issue');
    }
  };

  useEffect(() => {
    if (props.userDetails) {
      getPlaylistData();
    }
  }, [props.userDetails, getPlaylistData]); // Add getPlaylistData as a dependency

  return (
    <div>
      {props.userDetails == null ? (
        <div>Log in first</div>
      ) : checkArrayEmpty(playlist) ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-8 h-8 bg-red-600 rounded-full animate-bounce"></div>
            <div className="w-8 h-8 bg-yellow-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col p-5 gap-5'>
          {playlist.map((data) => (
            <Playlistsong 
              key={data.id}
              songid={data.id}
              data={data}
              song={playlist}
              userDetails={props.userDetails}
              handleDataFromPlaylistsong={handleDataFromPlaylistsong}
              handlePlaylistRemove={handlePlaylistRemove} // Ensure the correct prop name
            />
          ))}
        </div>
      )}
      <div className="fixed bottom-0">
        {onClickSong.length > 0 ? (
          <Song songData={onClickSong} />
        ) : (
          <Song songData={playlist} />
        )}
      </div>
    </div>
  );
}
