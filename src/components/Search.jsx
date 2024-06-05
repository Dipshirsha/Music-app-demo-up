import React from 'react'


import { useState } from "react";



export default function Search(props) {

  const [name, setName] = useState("")


function getBool(dataName,name){
dataName=dataName.toLowerCase();
name=name.toLowerCase();
const pos=dataName.search(name);

if(pos>=0 && name!==""){
  return true
}
else{
  return false
} 
}

const handleClick = (data) => {
  const dataOfperticularSong = { Name: data.Name, imgUrl: data.imgUrl, AudioUrl: data.AudioUrl };
  const newData = [dataOfperticularSong, ...props.song];
  props.handleDataFromHomesong(newData); // Ensure the correct prop name
};







  return (

    <div >
      <form action="" className='flex justify-center items-center gap-2' >
        <input className='w-96 text-center shadow-md shadow-slate-700 rounded-md  ' type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Serach here" />
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </form>

      {
        props.song.map(data => <div >
          {getBool(data.Name,name)===true ? 
          <div className='my-3 flex flex-row gap-2 justify-center items-center cursor-pointer ' onClick={() => handleClick(data)} >
            <img  src={data.imgUrl} height='100px' width='100px' alt='' />
            <h1 className='text-lg  text-blue-700'>{data.Name}</h1>
             </div> 
            : <p></p>}
        </div>)
      }

    </div>
  )
}
