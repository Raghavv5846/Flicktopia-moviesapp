import './App.css';
import Navbar from './components/Navbar';
import Moviepage from './pages/Moviepage/Moviepage'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import cors from 'cors';
import Showpage from './pages/Showpage/Showpage';
import Mainpage from './pages/Mainpage/Mainpage';
import Signup from './pages/Signup/Signup';
import './js/signin'
import Axios from 'axios';
import Sign from './pages/Signin/Login';
import Mainmoviepage from './pages/Mainmoviepage/Mainmoviepage';
import Mainshowpage from './pages/Mainshowpage/Mainshowpage';
import Watchlist from './pages/Watchlist/Watchlist';
import { UserContext } from './context/UserContext';
import { ToastContainer } from 'react-toastify';

function App() {
  
  const [movPage, setMovpage] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjYyOGM2OTE1YTNjOTRiZDhiMDY0OGYyMGY3MzIxNCIsInN1YiI6IjY0NzI0NjE1OTQwOGVjMDEwMDI1NDEyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DSLOjHlogoRpkopgoW7_IjW52h2N84BIkrYEt5p5P0k'
    }
  }
  
  // useEffect(() => {
  // const fetchmovie=async ()=>{
  //   try {
  //     const response= await fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
  //     const data=await response.json();
      
  //     setMovitems(data.results);
  //   } catch (err) {
  //     console.log(err);
  //           }
  //       }   

  //     const fetchshow=async ()=>{
  //       try {
  //         const response= await fetch('https://api.themoviedb.org/3/trending/tv/week?language=en-US', options)
  //         const data=await response.json();
          
  //         setShowitems(data.results);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }   
  //         fetchmovie();
  //         fetchshow();
         
  //       },[])
        return (
          <>
          

          <Router>
            <Routes>
              <Route exact path='/' element={<Mainpage options={options} />}/>
              <Route exact path='/movie/:id' element={<Moviepage options={options}/>}/>
              <Route exact path='/show/:id' element={<Showpage options={options}/>}/>
              <Route exact path='/sign-in/' element={<Sign/>}/>
              <Route exact path='/sign-up/' element={<Signup/>}/> 
              <Route exact path='/movies/' element={<Mainmoviepage options={options}/>}/>
              <Route exact path='/shows/' element={<Mainshowpage options={options}/>}/>
              <Route exact path='/watchlist/' element={<Watchlist options={options}/>}/>
            </Routes>
              <ToastContainer/>
          </Router>
          
    
    </>
  );
        
};
  
export default App;
