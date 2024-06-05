
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { auth, txtDB } from "./components/config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";


import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import Navbar from './components/Navbar'
import Album from './components/Album';
import Dashboard from './components/Dashboard';
import Song from './components/Song';
import Playlist from './components/Playlist'


function App() {



  const [userDetails, setUserDetails] = useState(null);
  const [userUid, setUserUid] = useState(null);

  const fetchUserData = async () => {
    
      auth.onAuthStateChanged(async (user) => {
      
        if(!user){
          setUserDetails(null)
          setUserUid(null);
        }
        else{
          setUserUid(user.uid);
        const docRef = doc(txtDB, "Users", user.uid);
        console.log(docRef);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("User is not logged in");
        }
      }
      });
    


  };

  useEffect(() => {
    fetchUserData();
  }, []);






  return (


    
    <div className="App">

     <Router>
     <Navbar userDetails={userDetails} />
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Home userDetails={userDetails} userUid={userUid}/>}/>
          <Route path="/album" element={<Album />}/>
       <Route path="/dashboard" element={<Dashboard userDetails={userDetails}/>}/>
       <Route path="/playlist" element={<Playlist userDetails={userDetails}  userUid={userUid}/>}/>
       <Route path="/song" element={<Song />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
