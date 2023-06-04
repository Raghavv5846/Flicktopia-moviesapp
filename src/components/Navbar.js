import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/navbar.css'
export default function Navbar(props) {
  return (
    <>
    
   <nav className="nav">
        <div className="container">
            <div className="logo">
                <Link to="/">FlickTopia</Link>
            </div>
            <div id="mainListDiv" className="main_list">
                <ul className="navlinks">
                    <li><Link to="/">Movies</Link></li>
                    <li><Link to="/">Shows</Link></li>
                    <li><Link to="/">Login</Link></li>
                    <li><Link to="/">Register</Link></li>
                </ul>
            </div>
            <span className="navTrigger">
                <i></i>
                <i></i>
                <i></i>
            </span>
        </div>
    </nav>
    
    </>
  )
}
