import React, { createContext, useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Searchbar from '../../components/Searchbar'
import { Link } from 'react-router-dom'
import Loader from '../../components/loader'
import Movieitems from '../../components/Movieitems'
import Showitems from '../../components/Showitems'
import axios from 'axios'
import '../../styles/input.css'
import '../../styles/moviepage.css'
import '../../styles/searched.css'
// import {MoviesContext} from '../../context/MoviesContext'
import { UserContext } from '../../context/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { maindata } from '../../operations/maindata'
import { movItems, showItems } from '../../slices/dataslices'

export const AuthContext=createContext();
export default function Mainpage(props) {

    const {loggedin,user}=useContext(UserContext);
    // const {movItems,showItems}=useContext(MoviesContext);
    const dispatch=useDispatch();
    const {movItems,showItems,loading}=useSelector((state)=>state.maindata);
    // const showItems=useSelector(showItems);

    useEffect(() => {
        // console.log(loading,"hiii");
        dispatch(maindata());
        
    }, [loading])
    

    if(loading){
        return 
        (<div>
        <Loader/>
        </div>)
    }
  return (
    <>
    <Navbar logged={loggedin} user={user}/>
    <Searchbar options={props.options} movies={movItems}/>
    <div className='d-flex align-items-center justify-content-center' style={{height:"10rem"}}>
        <div className='bg-dark' style={{color:"white",padding:"10px",margin:"auto"}}>
    <h3 >Trending Movies</h3>
        </div>
    </div>
    {movItems ? 
    <div className='row g-2 justify-content-center align-items-center'>
        {movItems.map((element)=>{
            return (
                <Link className="col-md-2 col-sm-3 col-3" key={element.id} to={`/movie/${element.id}`}>
            <Movieitems poster={element.poster_path} rating={element.vote_average} name={element.original_title} date={element.release_date}/>
        </Link>
            )
        })}
    </div>
    : <Loader/>
}
    <div className='d-flex align-items-center justify-content-center' style={{height:"10rem"}}>
        <div className='bg-dark' style={{color:"white",padding:"10px",margin:"top"}}>
    <h3 >Trending Shows</h3>
        </div>
    </div>
    {showItems ? 
    <div className='row g-2 justify-content-center align-items-center'>
        {showItems.map((element)=>{ 
            return (
                <Link  key={element.id}to={`/show/${element.id}`} className="col-md-2 col-sm-3 col-3">
                    <Showitems poster={element.poster_path} rating={element.vote_average} name={element.name} />
        </Link>
            )
        })}
    </div>
    : <Loader/>
}
        </>
  )
}
