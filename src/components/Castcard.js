import React from 'react'
import '../styles/cast.css'
export default function Castcard(props) {
  return (
    <div className="cast-card">
    <div className="card-img"> 
    <img src={`https://image.tmdb.org/t/p/original${props.poster}`} style={{height:"inherit",width:"inherit"}}/>
    </div>
    
<div className="card-info">
<h3 className="title" style={{marginBottom:"0px"}}>{props.name}</h3>
<h3 className="subtitle">{props.character}</h3>
</div>
</div>
  )
}
