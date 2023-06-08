import React, { useEffect, useState } from 'react'


export default function Mainmoviepage(props) {
    console.log(props);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % props.movies.length);
      }, 10000);
  
      return () => clearInterval(interval);
    }, [props.movies.length]);
  
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{position:"relative",zIndex:"0"}}>
  <div className="carousel-inner" data-bs-interval="10000">
  {props.movItems.backdrop_path.map((path, index) => (
        <div className={`carousel-item ${index === activeIndex ? 'active' : ''}`} key={index}>
          <img src={`https://image.tmdb.org/t/p/original${path}`} className="d-block w-100" alt="" />
        </div>
      ))}
    {/* <div className="carousel-item active">
      <img src={`https://image.tmdb.org/t/p/original${backdrop[0]}`} className="d-block w-100" alt=""/>
    </div>
    <div className="carousel-item">
      <img src={`https://image.tmdb.org/t/p/original${backdrop[1]}`} className="d-block w-100" alt=""/>
    </div>
    <div className="carousel-item">
      <img src={`https://image.tmdb.org/t/p/original${backdrop[2]}`} className="d-block w-100" alt=""/>
    </div> */}
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
