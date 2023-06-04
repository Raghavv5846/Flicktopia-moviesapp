import React, { useEffect, useState } from 'react'
import Movieitems from './Movieitems'
import { Link } from 'react-router-dom';

export default function Moviepage2(props) {
    console.log("props",props.items);
  return (
    <>
    <div style={{display:"flex",flexDirection:"column"}}> 
    
    <div style={{background:"black"}}> 
    <h1 style={{paddingLeft:"3rem",paddingTop:"2rem",color:"white",paddingBottom:"2rem"}}>
        You Should not miss ......
    </h1>
    </div>
    <div className="row align-items-center " style={{gap:"3rem",paddingLeft:"3rem",paddingRight:"3rem",background:"black"}}>
        { props.items ? props.items.similar.results.slice(0,20).map((element)=>{
            return (
                <Link className="col-md-2" key={element.id} style={{padding:"15px"}} to={`/movie/${element.id}`} state={{id:element.id}} preventScrollReset={true}>
            <Movieitems poster={element.poster_path} rating={element.vote_average} name={element.original_title} date={element.release_date} />
        </Link>
            )
        }):"Loading..."}
    </div>
        </div>
    </>
  )
}
