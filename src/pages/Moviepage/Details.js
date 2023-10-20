import React from 'react'
import Castcard from '../../components/Castcard';
import { Link } from 'react-router-dom';
import '../../styles/details.css'
import Episodes from '../Showpage/Episodes';
export default function Moviepage3(props) {
  let dateStr;
  if(props.data==='tv'){
    dateStr = props.items.first_air_date;
  }
  else{
    dateStr = props.items.release_date;

  }
    const date = new Date(dateStr);

    // Get the day
    const day = date.getDate();

    // Get the month name
    const monthIndex = date.getMonth();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[monthIndex];

    // Get the year
    const year = date.getFullYear();

    // Concatenate the day, month, and year
    const formattedDate = `${day} ${month} ${year}`;

if(props.data==='movie'){
  return (
    <div style={{padding:"3rem"}} className='detailspage'>
      <div>
        <h1>Genre</h1>
        <div style={{display:"flex",gap:"2rem"}}>
        {props.items.genres.map((e)=>{
          return (
            <h3 key={e.id}>{e.name}</h3>
            )
          })}
          </div>
      </div>
      <div>
        <h1>Release Date</h1>
        <div>
          <h3>{formattedDate}</h3>
        </div>
      </div>
      <div>
        <h1>
          Cast and Crew
        </h1>
        <div className="row align-items-center p-xl-3 cast-section">
        {props.items.credits.cast.slice(0,10).map((element)=>{
          return (
            <Castcard name={element.name} character={element.character} poster={element.profile_path}/>
        
            )
        })}
        </div>
      </div>
      <div>
        <h1>Languages</h1>
        <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}> 
        {props.items.spoken_languages.map((element)=>{
          return (
            <h3>{element.english_name}</h3>
            )
        })}
        </div>
      </div>
    </div>
  )
      }
      if(props.data==='tv'){
        return (
          <div style={{padding:"3rem"}} className='detailspage'>
            <div>
              <h1>Genre</h1>
              <div style={{display:"flex",gap:"2rem"}}>
              {props.items.genres.map((e)=>{
                return (
                  <h3 key={e.id}>{e.name}</h3>
                  )
                })}
                </div>
            </div>
            <div>
              <h1>First season was Aired on</h1>
              <div>
                <h3>{formattedDate}</h3>
              </div>
            </div>
            <div>
              <h1>Seasons</h1>
              <div style={{display:"flex",gap:"2rem"}}>
                <h3>{props.items.number_of_seasons} Seasons</h3>
                <h3>{props.items.number_of_episodes} Episodes</h3>
                </div>
            </div>
            <div>
              <h1>Last Episode</h1>
              <Episodes items={props.items.last_episode_to_air} type="details"/>
            </div>
            <div>
              <h1>Directors</h1>
              <div style={{display:"flex",gap:"2rem"}}>
              {props.items.created_by.map((element)=>{
                  return (    
                      <Castcard name={element.name} character="" poster={element.profile_path}/>
                
                  )
                })}
                </div>

            </div>
            <div>
              <h1>
                Cast and Crew
              </h1>
              <div className="row align-items-center p-xl-3 cast-section">
              {props.items.credits.cast.slice(0,10).map((element)=>{
                return (
                <Link className="col-md-2" key={element.id} style={{padding:"15px"}} to={`/movie/${element.id}`} state={{id:element.id}}>
                  <Castcard name={element.name} character={element.character} poster={element.profile_path}/>
              </Link>
                  )
              })}
              </div>
            </div>
            <div>
              <h1>Languages</h1>
              <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}> 
              {props.items.spoken_languages.map((element)=>{
                return (
                  <h3>{element.english_name}</h3>
                  )
              })}
              </div>
            </div>
          </div>
        )
      }
}

    