import React, { useContext, useEffect, useState } from 'react'
import { MoviesContext } from '../../context/MoviesContext';
import '../../styles/moviepage.css'
import Mainmoviepage2 from './Mainmoviepage2';
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router';

export default function Mainmoviepage(props) {
    const {movItems,showItems}=useContext(MoviesContext);
    const [activeIndex, setActiveIndex] = useState(0);
    const propsFromLink=useLocation();
    
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % movItems.length);
      }, 10000);
  
      return () => clearInterval(interval);
    }, [movItems.length]);
  return (
    <>
    <Navbar/>
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{position:"relative",zIndex:"0"}}>
  <div className="carousel-inner" data-bs-interval="10000">
  {movItems.map((path, index) => (
    <>
        <div className={`carousel-item ${index === activeIndex ? 'active' : ''}`} key={index}>
          <img src={`https://image.tmdb.org/t/p/original${path.backdrop_path}`} className="d-block w-100" alt="" />
            <div className='movieDetails'>
        <h1 style={{fontSize:"3rem"}} >{path.title}</h1>
            <h5 style={{color:"white"}}>movie</h5>
            <h3>{path.overview}</h3>
            <h2>Details</h2>
            </div>
        </div>
        {/* </div>
        <div className="movieDetails "> */}
    </>
      ))}
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
<Mainmoviepage2 options={props.options}/>
</>
  )
}
