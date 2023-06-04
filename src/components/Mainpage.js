import React from 'react'
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import { Link } from 'react-router-dom'
import Loader from './loader'
import Movieitems from './Movieitems'
import Showitems from './Showitems'

export default function Mainpage(props) {
  return (
    <>
    <Navbar/>
    <Searchbar options={props.options} movies={props.movies}/>
    <div className='d-flex align-items-center justify-content-center' style={{height:"10rem"}}>
        <div className='bg-dark' style={{color:"white",padding:"10px"}}>
    <h3 >Trending Movies</h3>
        </div>
    </div>
    {props.movies ? 
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)"}}>
      {console.log(props.movies)}
        {props.movies.map((element)=>{
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

    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)"}}>
        {props.shows.map((element)=>{ 
            return (
                <Link  key={element.id} style={{padding:"15px"}} to={`/show/${element.id}`}>
            <Showitems poster={element.poster_path} rating={element.vote_average} name={element.name} />
        </Link>
            )
        })}
    </div>
        </>
  )
}
