import React, { useState } from 'react';
import { auth } from "./config/firebase.config";
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar(props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/");
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <Link to="/" className='navbar-logo'>
          <img className='logo-img' src="https://media.ipassio.com/media/blog/10-easy-bollywood-hindi-songs-to-sing-for-beginners/blog_icon/easy-hindi-songs-to-sing-for-beginners.webp" alt="Logo" />
        </Link>
        <div className='navbar-links'>
          <Link to="/album" className='navbar-link'>Albums</Link>
          <div className='navbar-link'>Artists</div>
          <div className='navbar-link'>Your Favourite</div>
        </div>
      </div>
      <div className='navbar-right'>
        <div className='navbar-user'>
          {props.userDetails === null ? (
            <Link to="/login" className='navbar-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-badge-fill" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z" />
              </svg>
            </Link>
          ) : (
            <Link to="/dashboard" className='navbar-link'>Dashboard</Link>
          )}
        </div>
        <div className='navbar-user'>
          {props.userDetails === null ? (
            <Link to="/login" className='navbar-link'>Login</Link>
          ) : (
            <button onClick={handleLogout} className='navbar-link'>Logout</button>
          )}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="navbar-menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="menu-icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className='navbar-dropdown'>
          <Link to="/album" className='navbar-dropdown-link' onClick={() => setIsOpen(false)}>Albums</Link>
          <div className='navbar-dropdown-link' onClick={() => setIsOpen(false)}>Artists</div>
          <div className='navbar-dropdown-link' onClick={() => setIsOpen(false)}>Your Favourite</div>
          <div className='navbar-dropdown-link'>
            {props.userDetails === null ? (
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            ) : (
              <button onClick={() => { setIsOpen(false); handleLogout(); }}>Logout</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
