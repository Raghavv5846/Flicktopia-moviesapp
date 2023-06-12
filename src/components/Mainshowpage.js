import React, { useContext, useEffect, useState } from 'react'
import { MoviesContext } from '../context/MoviesContext';
import Navbar from './Navbar';
import Mainmoviepage2 from './Mainmoviepage2';
import Mainshowpage2 from './Mainshowpage2';

export default function Mainshowpage(props) {
    const {movItems,showItems}=useContext(MoviesContext);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % showItems.length);
      }, 10000);
  
      return () => clearInterval(interval);
    }, [showItems.length]);
  return (
    <>
    <Navbar/>
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{position:"relative",zIndex:"0"}}>
  <div className="carousel-inner" data-bs-interval="10000">
  {showItems.map((path, index) => (
    <>
        <div className={`carousel-item ${index === activeIndex ? 'active' : ''}`} key={index}>
          <img src={`https://image.tmdb.org/t/p/original${path.backdrop_path}`} className="d-block w-100" alt="" />
            <div className='movieDetails'>
        <h1 style={{fontSize:"3rem"}} >{path.name}</h1>
            <h5 style={{color:"white"}}>tv</h5>
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
<Mainshowpage2 options={props.options}/>
</>
  )
}

