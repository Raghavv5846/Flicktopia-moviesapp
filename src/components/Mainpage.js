import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import { Link } from 'react-router-dom'
import Loader from './loader'
import Movieitems from './Movieitems'
import Showitems from './Showitems'
import axios from 'axios'
import '../styles/input.css'
import '../styles/moviepage.css'
import '../styles/searched.css'
import {MoviesContext} from '../context/MoviesContext'

export default function Mainpage(props) {
    const [loggedin,setLoggedin]=useState(false);
    const [user,setUser]=useState();
    console.log(useContext(MoviesContext));
    const {movItems,showItems}=useContext(MoviesContext);
    console.log("movItems",movItems);
    
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
    useEffect(()=>{
        axios({url: "http://localhost:8000/protected",withCredentials: true,})
            // Handle the response from backend here
            .then((res) => {
                console.log(res.data);
                if(res.data.status==='success'){
                    setLoggedin(true);
                    setUser(res.data.user);
                }
            })
            // Catch errors if any
            .catch((err) => { });

    },[loggedin])

  return (
    <>
    <Navbar logged={loggedin} user={user} movItems={movItems} showItems={showItems}/>
    <Searchbar options={props.options} movies={movItems}/>
    <div className='d-flex align-items-center justify-content-center' style={{height:"10rem"}}>
        <div className='bg-dark' style={{color:"white",padding:"10px"}}>
    <h3 >Trending Movies</h3>
        </div>
    </div>
    {movItems ? 
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)"}}className='main-movieItems'>
        {movItems.map((element)=>{
          return (
            <Link className="col-md-2" key={element.id} style={{padding:"15px"}} to={`/movie/${element.id}`}>
            <Movieitems poster={element.poster_path} rating={element.vote_average} name={element.original_title} date={element.release_date}/>
        </Link>
            )
          })}
    </div>
    : <Loader/>
}
    <div className='d-flex align-items-center justify-content-center' style={{height:"10rem"}}>
        <div className='bg-dark' style={{color:"white",padding:"10px"}}>
    <h3 >Trending Shows</h3>
        </div>
    </div>
    {showItems ? 
    <div className='main-showItems'>
        {showItems.map((element)=>{ 
            return (
                <Link  key={element.id} style={{padding:"15px"}} to={`/show/${element.id}`}>
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
