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
import {MoviesContext} from '../../context/MoviesContext'
import { UserContext } from '../../context/UserContext'


export const AuthContext=createContext();
export default function Mainpage(props) {

    const {loggedin,user,loading}=useContext(UserContext);
    const {movItems,showItems}=useContext(MoviesContext);
    console.log(useContext(UserContext));
   
    // useEffect(() => {
    //     const fetchmovie=async ()=>{
    //       try {
    //         const response= await fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', props.options)
    //         const data=await response.json();
            
    //         setMovitems(data.results);
    //       } catch (err) {
    //         console.log(err);
    //               }
    //           }   
      
    //         const fetchshow=async ()=>{
    //           try {
    //             const response= await fetch('https://api.themoviedb.org/3/trending/tv/week?language=en-US', props.options)
    //             const data=await response.json();
                
    //             setShowitems(data.results);
    //           } catch (err) {
    //             console.log(err);
    //           }
    //         }   
    //             fetchmovie();
    //             fetchshow();
               
    //           },[])


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
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)"}}className='main-movieItems'>
        {movItems.map((element)=>{
            return (
                <Link className="col-md-2" key={element.id} to={`/movie/${element.id}`}>
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
    <div className='main-showItems'>
        {showItems.map((element)=>{ 
            return (
                <Link  key={element.id}to={`/show/${element.id}`} className="col-md-2">
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
