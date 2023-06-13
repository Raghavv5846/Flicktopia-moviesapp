import React from 'react'

export default function Episodes(props) {
    
  return (
    <div style={{display:'flex',padding:"4rem 0rem 2rem 4rem",gap:"2rem"}} className='p-xxl-5 season-episodes'>
        <div>
            <img style={{height:"250px",width:"350px",borderRadius:"5px"}} src={`https://image.tmdb.org/t/p/original${props.items.still_path}`}/>
        </div>
        <div>
            <h1 style={{fontWeight:"800"}}>S{props.items.season_number} E{props.items.episode_number}-{props.items.name}</h1>
            <div style={{display:"flex",gap:"1rem",fontSize:"1.2rem",fontWeight:"200"}}>
            <h4>Aired on : {props.items.air_date}</h4>
            <h4>{props.items.runtime}min</h4>
            </div>
            <div style={{fontSize:"1.5rem",marginTop:"25px"}}>
                <h3>{props.items.overview}</h3>
            </div>
        </div>
    </div>
  )
}
