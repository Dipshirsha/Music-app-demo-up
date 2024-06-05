import React from 'react';
import './Song.css'
export default function Homesong(props) {
  
  const handleClick = () => {
    const dataOfperticularSong = { Name: props.data.Name, imgUrl: props.data.imgUrl, AudioUrl: props.data.AudioUrl };
    const newData = [dataOfperticularSong, ...props.song];
    props.handleDataFromHomesong(newData); 
    console.log(props.songid);// Ensure the correct prop name
  };


  const handlePlaylist=()=>{
  
    props.handlePlaylistAdd(props.songid);
  }

  return (
    <div className='eachsong' onClick={handleClick}>
     
      {props.data.type.toLowerCase()===props.type?<div   >
      <img src={props.data.imgUrl} alt='' />
      <div className='playlist-add'>
      <h1>{props.data.Name}</h1>
      <i class="bi bi-plus-square "  onClick={handlePlaylist}></i>
      </div>
      </div>:null}
    
     
    
    </div>
  );
}
