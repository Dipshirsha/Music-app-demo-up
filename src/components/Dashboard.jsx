import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


import { DB, txtDB } from "./config/firebase.config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react'


export default function Dashboard(props) {

const navigate=useNavigate();

const [name, setName] = useState('')
const [img, setImg] = useState('')
const [audio, setAudio] = useState('')
const [type, setType] = useState('')

const handleImageUpload = (e) =>{
    console.log(e.target.files[0])
    const imgs = ref(DB,`Imgs/${v4()}`)
    uploadBytes(imgs,e.target.files[0]).then(data=>{
        console.log(data,"imgs")
        getDownloadURL(data.ref).then(val=>{
            setImg(val)
        })
    })
}

const handleAudioUpload = (e) =>{
    console.log(e.target.files[0])
    const imgs = ref(DB,`Audio/${v4()}`)
    uploadBytes(imgs,e.target.files[0]).then(data=>{
        console.log(data,"audio")
        getDownloadURL(data.ref).then(val=>{
            setAudio(val)
        })
    })
}

const handleClick = async () =>{
    const valRef = collection(txtDB,'txtData')
    await addDoc(valRef,{Name:name,imgUrl:img,AudioUrl:audio,type:type})
    alert("Data added successfully")
}




  return (
    <div>
      {props.userDetails==null?navigate("/"):<p>Dashboard</p>}


      <input onChange={(e)=>setName(e.target.value)} /><br/>
      image
             <input type="file" onChange={(e)=>handleImageUpload(e)} /><br/><br/>
             audio
             <input type="file" onChange={(e)=>handleAudioUpload(e)} /><br/><br/>
type
             <input onChange={(e)=>setType(e.target.value)} /><br/>

             <button onClick={handleClick}>Add</button>




    </div>
  )
}
