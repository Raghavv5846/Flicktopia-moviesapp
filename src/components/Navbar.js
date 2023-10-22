import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css'
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import $ from 'jquery'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
export default function Navbar(props) {
    const navigate = useNavigate();
    const {user,loggedin}=useSelector((state)=>state.userdata);
    const handleLogout=()=>{
        axios({url: `${process.env.REACT_APP_HOST}/logout`,withCredentials: true,})
        // Handle the response from backend here
        .then((res) => {
            
            if(res.data.status==='success'){
                navigate('/');
                window.location.reload();
            }
        })
        // Catch errors if any
        .catch((err) => {console.log(err); }); 
    }
    const handleClick=(e)=>{
        $('.navTrigger').toggleClass('active');
        $("#mainListDiv").toggleClass("show_list");
        $("#mainListDiv").fadeIn();

    }
  return (
    <>
   <nav className="nav" >
        <div className="container">
            <div className="logo">
                <Link to="/">FlickTopia</Link>
            </div>
            <div id="mainListDiv" className="main_list">
                <ul className="navlinks">
                    <li><Link to="/movies" state={{loggedin,user}}>Movies</Link></li>
                    
                
                    <li><Link to="/shows">Shows</Link></li>
                    {loggedin ?
                    <>
                    <li><Link to="/watchlist">Watchlist</Link></li>
                    <li><Link to="/" >{user}</Link></li>
                    <li><Link to="/logout" onClick={handleLogout}>logout</Link></li>

                    </>
                    :
                    <>
                    <li><Link to="/sign-in">Login</Link></li>
                    <li><Link to="/sign-up">Register</Link></li> 
                    </>
                }
                </ul>
            </div>
            <span className="navTrigger" onClick={handleClick}>
                <i></i>
                <i></i>
                <i></i>
            </span>
        </div>
    </nav>
    <ToastContainer/>
    </>
  )
}
