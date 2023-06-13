import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Movieitems from '../../components/Movieitems';
import '../../styles/watchlist.css'
import { UserContext } from '../../context/UserContext';
import Showitems from '../../components/Showitems';

export default function Watchlist(props) {
const [watchlist,setWatchlist]=useState(null);
const {user,loggedin}=useContext(UserContext);
const navigate = useNavigate();
    useEffect(() => {
      const fetchlist=()=>
      {
        axios({url: `${process.env.REACT_APP_HOST}/list`,withCredentials: true,})
        // Handle the response from backend here
        .then((res) => {
            console.log(res.data,"watchlist");
            setWatchlist(res.data.list);
        })
        // Catch errors if any
        .catch((err) => { });
      }
    
     fetchlist();
    }, [])
    if(!user){
        navigate('/');
    }
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
    <a style={{padding:"0.5rem",background:"black",color:"white"}}>Watchlist</a>
    {watchlist ? 
        <div className='list'>
    {watchlist.map((element)=>{
        if(element.type==='movie'){
            return (
                <div style={{marginTop:"20px"}}>
                <button type="button" class="btn btn-primary btn-sm">remove</button>
                <Movieitems poster={element.image} rating={element.rating} name={element.name} date={element.date}/>
                </div>
                )
            }
            else{
                return (
                    <div style={{marginTop:"20px"}}>
                <button type="button" class="btn btn-primary btn-sm">remove</button>

                    <Showitems poster={element.image} rating={element.rating} name={element.name}/>
                    </div>
                    )
            }
    })}
    </div>
    : 
    <div style={{display:"flex",justifyContent:'center'}}>
    "Empty"
    </div>
    }
    
   </div>
   </>

  )
}