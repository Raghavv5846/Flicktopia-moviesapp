import React, { createContext, useContext, useEffect, useState } from 'react'
import Loader from '../components/loader';
export const MoviesContext = createContext();
export default function Apicontext({children}) {
    const [movItems, setMovitems] = useState(null);
    const [showItems, setShowitems] = useState(null);
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjYyOGM2OTE1YTNjOTRiZDhiMDY0OGYyMGY3MzIxNCIsInN1YiI6IjY0NzI0NjE1OTQwOGVjMDEwMDI1NDEyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DSLOjHlogoRpkopgoW7_IjW52h2N84BIkrYEt5p5P0k'
        }
      }
    useEffect(() => {
        const fetchmovie=async ()=>{
          try {
            const response= await fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
            const data=await response.json();
            
            setMovitems(data.results);
          } catch (err) {
            console.log(err);
                  }
              }   
      
            const fetchshow=async ()=>{
              try {
                const response= await fetch('https://api.themoviedb.org/3/trending/tv/week?language=en-US', options)
                const data=await response.json();
                
                setShowitems(data.results);
              } catch (err) {
                console.log(err);
              }
            }   
                fetchmovie();
                fetchshow();
               
              },[]);
             
              if (!movItems || !showItems) {
                // Return a loading state or any placeholder until data is fetched
                return <Loader/>
              }
              
                const items={movItems,showItems};
                  return (
                      <MoviesContext.Provider value={items}>
                       {children}
    </MoviesContext.Provider>
  )
}
