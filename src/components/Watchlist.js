import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

export default function Watchlist(props) {
  return (
   <>
       <nav className="nav" style={{backgroundColor:"black",overflow:"hidden",position:"initial"}}>
        <div className="container">
            <div className="logo">
                <Link to="/">FlickTopia</Link>
            </div>
            <div id="mainListDiv" className="main_list">
                <ul className="navlinks">
                    <li><Link to="/movies">Movies</Link></li>
                    
                
                    <li><Link to="/shows">Shows</Link></li>
                    {props.logged ?
                    <>
                    <li><Link to="/watchlist">Watchlist</Link></li>
                    <li><Link to="/sign-in">{props.user}</Link></li>
                    </>
                    :
                    <>
                    <li><Link to="/sign-in">Login</Link></li>
                    <li><Link to="/sign-up">Register</Link></li> 
                    </>
                }
                </ul>
            </div>
            <span className="navTrigger">
                <i></i>
                <i></i>
                <i></i>
            </span>
        </div>
    </nav>
   <div style={{fontSize:"2.5rem",position:'relative',top:"4rem",left:"10rem"}}>
    <h1>Watchlist</h1>
    <h2>jkshdjkhjk</h2>
   </div>
   </>

  )
}