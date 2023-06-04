import React from 'react'
import LazyLoad from 'react-lazy-load'
export default function Showitems(props) {
    // console.log(props.poster);
  return (
    <>
     <div class="card d-block w-100">
  <div class="content">
    <div class="back">
        <LazyLoad offset={50} height={408} onContentVisible={() => {console.log('loaded!')}}>
           <img src={`https://image.tmdb.org/t/p/original${props.poster}`} style={{height:"inherit",width:"inherit"}}/>
        </LazyLoad>
      </div>
    <div class="front">
      
      <div class="img">
      <LazyLoad offset={50} height={408} onContentVisible={() => {console.log('loaded!')}}>
           <img src={`https://image.tmdb.org/t/p/original${props.poster}`} style={{height:"inherit",width:"inherit"}}/>
        </LazyLoad>
        <div class="circle">
        </div>
        <div class="circle" id="right">
        </div>
        <div class="circle" id="bottom">
        </div>
      </div>

      <div class="front-content">
        <div class="description">
          <div class="title">
            <h4 style={{fontFamily: 'Bebas Neue',letterSpacing:"1.5px"}}>
              <strong>{props.name}</strong>
            </h4>
          </div>
         
          <h4 style={{fontFamily: 'Bebas Neue'}}><span>{props.rating}</span>/10</h4>
  
        </div>
      </div>
    </div>
    </div>
  </div>
      
    </>
  )
}
