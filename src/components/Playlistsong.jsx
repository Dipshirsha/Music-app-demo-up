import React from 'react'

export default function Playlistsong(props) {

    const handleClick = () => {
        const dataOfperticularSong = { Name: props.data.Name, imgUrl: props.data.imgUrl, AudioUrl: props.data.AudioUrl };
        const newData = [dataOfperticularSong, ...props.song];
        props.handleDataFromPlaylistsong(newData); 
        console.log(props.songid)
       
      };

    
      const handlePlaylist=()=>{
  
        props.handlePlaylistRemove(props.songid);
      }
    

  return (
   
<div className='h-20 w-20  '   onClick={handleClick}>
     {props.userDetails.playlist.indexOf(props.songid)+1}
    <div className='flex gap-96 border-gray-200 border-8 bg-neutral-700 '>
      
     <img src={props.data.imgUrl} alt='' />
     <div className='playlist-add'>
     <h1>{props.data.Name}</h1>
   <div className='cursor-pointer'>
   <i class="bi bi-dash-square"onClick={handlePlaylist}></i>
   </div>
  
     </div>
     </div>
   
    
   
   </div>

  )
}
