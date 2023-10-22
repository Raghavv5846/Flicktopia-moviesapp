import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Movieitems from '../../components/Movieitems';
import '../../styles/watchlist.css'
import { UserContext } from '../../context/UserContext';
import Showitems from '../../components/Showitems';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../../operations/auth';
import Loader from '../../components/loader';

export default function Watchlist(props) {
const [watchlist,setWatchlist]=useState(null);
let isEmpty=false;
// const {user,loggedin}=useContext(UserContext);
const dispatch=useDispatch();
const user=useSelector((state)=> state.userdata.user);
    // const userloading=useSelector((state)=> state.userdata.userLoading);
    const loggedin=useSelector((state)=> state.userdata.loggedin);



const navigate = useNavigate();
    useEffect(() => {
      const fetchlist=()=>
      {
        axios({url: `${process.env.REACT_APP_HOST}/list`,withCredentials: true,})
        // Handle the response from backend here
        .then((res) => {
            setWatchlist(res.data.list);
            if(res.data.list.length>0) isEmpty=true;

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
    {watchlist.map((element,index)=>{
        const handleRemove=()=>{
            const updatedWatchlist = [...watchlist];
    // Remove the element at the specified index
    updatedWatchlist.splice(index, 1);

    // Update the watchlist state
    setWatchlist(updatedWatchlist);
    dispatch(remove(index));
        }
        if(element.type==='movie'){
            return (
                <div style={{marginTop:"20px"}}>
                <button type="button" class="btn btn-primary btn-sm" onClick={handleRemove}>remove</button>
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
    : isEmpty?
    <div style={{display:"flex",justifyContent:'center'}}>
    "Empty"
    </div>
    : <Loader/>
    }
    
   </div>
   </>

  )
}