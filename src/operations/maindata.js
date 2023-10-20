
import { getMov, getShow, setLoading } from "../slices/dataslices";

export function maindata(){
    return async (dispatch)=>{
        
        // console.log("hiiiiiiiiiiiiiiiii");
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjYyOGM2OTE1YTNjOTRiZDhiMDY0OGYyMGY3MzIxNCIsInN1YiI6IjY0NzI0NjE1OTQwOGVjMDEwMDI1NDEyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DSLOjHlogoRpkopgoW7_IjW52h2N84BIkrYEt5p5P0k'
            }
          }
            const fetchmovie=async ()=>{
              try {
                const response= await fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
                const data=await response.json();
                if(data.results)
                {

                    dispatch(getMov(data.results));
                    dispatch(setLoading(false));
                }
                // dispatch(data.results);
              } catch (err) {
                console.log(err);
                      }
                  }   
          
                const fetchshow=async ()=>{
                  try {
                    const response= await fetch('https://api.themoviedb.org/3/trending/tv/week?language=en-US', options)
                    const data=await response.json();
                    dispatch(getShow(data.results));
                    // setShowitems(data.results);
                  } catch (err) {
                    console.log(err);
                  }
                }   
                    fetchmovie();
                    fetchshow();     
                
    }
}