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
                    {props.movItems ?
                    <li><Link to="/movies">Movies</Link></li>
                    :''
                }
                    <li><Link to="/">Shows</Link></li>
                    {props.logged ?
                    <>
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
    
    </>
  )
}
