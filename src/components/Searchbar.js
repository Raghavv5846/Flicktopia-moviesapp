import React,{useEffect} from 'react'
import { useState } from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import Loader from './loader';
import '../styles/loader.css'

function Searchbar(props) {
    const [backdrop,setbackdrop]=useState([]);
    const [input,setInput]=useState("");
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(false);
    let items=props.movies;
   
   const handleChange=(e)=>{
     let searchedContent=document.querySelector('.searched');
    if(e.target.value===""){
      
      setInput("");
      searchedContent.classList.remove('sactive');
    }else{
      searchedContent.classList.add('sactive');
      setInput(""+e.target.value);
    }
    const fetchdata=async ()=>{
      try {
        setLoading(true);
        const response= await fetch(`https://api.themoviedb.org/3/search/multi?query=${e.target.value}&include_adult=false&language=en-US&page=1`, props.options)
        const data=await response.json();
        
        setData(data.results);
        setLoading(false)
      } catch (err) {
        console.log(err);
              }
          }   
          fetchdata();
        }
        // useEffect(() => {
        // },[input])

       
    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{position:"relative",zIndex:"0"}}>
         
  <div className="carousel-inner" data-bs-interval="10000">
    
    <div className="carousel-item active">
      <img src={`https://image.tmdb.org/t/p/original${items.slice(0,3)[0].backdrop_path}`} className="d-block w-100" alt=""/>
    </div>
    <div className="carousel-item">
      <img src={`https://image.tmdb.org/t/p/original${items.slice(0,3)[1].backdrop_path}`} className="d-block w-100" alt=""/>
    </div>
    <div className="carousel-item">
      <img src={`https://image.tmdb.org/t/p/original${items.slice(0,3)[2].backdrop_path}`} className="d-block w-100" alt=""/>
    </div>
  </div>
    <div style={{zIndex:"1",color:"white",position: "absolute",top:"20%",left: "50%",transform: "translate(-50%, -50%)"}}>
      <h3 style={{fontSize: "5rem",fontWeight: "900"}}>
        FlickTopia
      </h3>
    </div>
    <div className="group" style={{zIndex:"1",position: "absolute",top:"40%",left: "50%",transform: "translate(-50%, -50%)"}}>
    {/* <Select options={options} /> */}
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
          <input placeholder="Search" type="search" className="input" value={input} onChange={handleChange}/>
    <div className='searched'>
      { data ? 
      loading ? <Loader/> :
      data.slice(0,20).map((element)=>{
      {console.log("you data has been ",loading)}
        if(element.title || element.name){
          return(  
            <Link key={element.id} className='searchItems' to={element.media_type==='movie' ? `/movie/${element.id}` : `/show/${element.id}`} state={{id:`${element.id}`}}>
              <LazyLoad offset={50}> 
              <img src={`https://image.tmdb.org/t/p/original${element.poster_path}`}/>
              </LazyLoad>
              <div>
                <h3 style={{fontSize:"1.5rem"}}>{element.media_type==='tv' ? element.name : element.title}</h3>
                <p style={{fontSize: "1rem",lineHeight:"0.5"}}>Release: {element.media_type==="tv" ? element.first_air_date:element.release_date}</p>
                <p style={{fontSize: "1rem",lineHeight:"0.5"}}>{element.media_type}</p>

              </div>
              </Link>
            )
          }
      }): 
      ""}
    </div>
    </div>
   
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  )
}

export default Searchbar;
Searchbar.prototype={
    options:[],

}