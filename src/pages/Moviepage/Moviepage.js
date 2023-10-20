import React,{useEffect, useState,useRef, useContext} from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import Youtube from 'react-youtube'
import Moviepage2 from './Similar';
import Movieitems from '../../components/Movieitems';
import Loader from '../../components/loader';
import '../../styles/moviepage.css'
import '../../styles/showpage.css'
import Moviepage3 from './Details';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';


export default function Moviepage(props) {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [movdata, setmovdata] = useState(null);
    const [isSimilar,setIsSimilar]=useState(true);
    const [imdbdata,setImdbdata]=useState(null);
    const [selectedOption, setSelectedOption] = useState('similar');
    const {user,loggedin}=useContext(UserContext);
    const [watchadded,setWatchadded]=useState(false);
    const [adding,setAdding]=useState(false);
    const [watchdata,setWatchdata]=useState({
      id:'',
      image:"",
      name:"",
      date:"",
      rating:"",
      type:"movie"
    })
    const {id}=useParams();
    
    const handleOptionClick = (option) => {
      if(option==='similar'){
        setIsSimilar(true);
      }else{
        setIsSimilar(false);
      }
      setSelectedOption(option);
    };
    useEffect(() => {
      if(user){
        axios({
          url: `${process.env.REACT_APP_HOST}/checklist`,withCredentials: true,method:"post",
          data: {id},
        })
        .then((res) => {
          if(res.data.status==='included'){
            setWatchadded(true);
          }
        })
        
        // Catch errors if any
        .catch((err) => { });
        
      }
      
    }, [adding])
    
    
    useEffect(()=>{
      const fetchMoviePage = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos,credits,similar,recommendations`,
            props.options
          );
          const data = await response.json();
          setmovdata(data);
          setWatchdata({
            id:data.id,
            image:data.poster_path,
            name:data.title,
            date:data.release_date,
            rating:data.vote_average,
            type:"movie"
          })
          
        } catch (err) {
          console.log(err);
        }
      };
      fetchMoviePage();
    },[id]);
    useEffect(()=>{

      if (movdata) {
        // alert("updated")
        const imdbid = movdata.imdb_id;
    
        const fetchImdb = async () => {
          try {
            const response = await fetch(
              `https://imdb-api.com/API/Ratings/k_x5q418tu/${imdbid}`
            );
            const data = await response.json();
            setImdbdata(data);
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchImdb();
      }
    },[movdata])
        if(movdata){
          var trailer=movdata.videos.results.filter((e)=>{
            return e.type==="Trailer";
          })
        }
  const handleRemoveVideo = () => {
    setIsFullScreen(false);
    setIsVideoReady(false);

  };
  const handleVideoReady = () => {
    setIsVideoReady(true);
  };
    const videoRef = useRef(null);
    // const fullScreen = event => {  
    //     var iframe = event.target.getIframe();  
    //     if (screenfull.isEnabled) {  
    //      screenfull.request(iframe);  
    //     }  
    //    };
    const opts = {
      height: "100%",  
      width: "100%",  
      controls: "1"
    };
    
    const handleWatch = ()=>{
      if(user){
        setAdding(true);
        axios({
          url: `${process.env.REACT_APP_HOST}/add`,withCredentials: true,
          method: "POST",
          data: watchdata,
    
        })
        .then((res) => {})
        
        // Catch errors if any
        .catch((err) => { })
        .finally(() => {
          setAdding(false);
        });
        
      }
    }
    

  const handleFullScreen = () => {
    
      setIsFullScreen(true);
}

  return (
    <>
    <Navbar logged={loggedin} user={user}/>
    {movdata ?
    <div className="backdrop" >
        <img src={`https://image.tmdb.org/t/p/original${movdata.backdrop_path}`} className='backdrop' alt=''/>
        <div className='movieDetails'>
            <h1 style={{fontSize:"3rem"}} >{movdata.title}</h1>
            <h5 style={{color:"white"}}>movie</h5>
            <h3>{movdata.overview}</h3>
        
        {imdbdata ? 
        <div style={{display:"flex",zIndex:"3",color:'white',gap:"3rem",fontWeight:"500"}}>
        <h3><a href="http://imdb.com" className="imdb-logo">{`IMDb : ${imdbdata.imDb}`}</a></h3>
        <h3><a href="https://www.rottentomatoes.com/" style={{textDecoration:"none",color:"white"}}>
          <img style={{height:"16px",width:"16px"}} src="https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg"/> 62%
          </a></h3>
            {/* <p>IMDB : 6.4</p> */}
            <h3>{movdata.runtime} min</h3>
            <h3>{imdbdata.year ? imdbdata.year : movdata.release_date.split('-')[0]}</h3>
        </div>  : <Loader/>
        }
      {isFullScreen ? 
       
      <div >
        <Youtube 
          ref={videoRef}
          videoId={trailer[0].key}
          opts={opts}  
          onReady={handleVideoReady}
          style={{position:"absolute",top:"0",width:"100%",height:"700px",zIndex:"4"}}
          />
          {isVideoReady ? 
          <button className='close-youtube' onClick={handleRemoveVideo}>X</button>
          : 
          <div style={{display:"flex",position:"absolute",zIndex:"3",top:"65%",left:"10%"}} >
        <button style={{width:"175px",height:"52px",background:"transparent"}}>
            <Loader/>
        </button>
        </div>
        }
        </div>
          : (
            <div className='btn'>
              <div style={{display:"flex",zIndex:"3",marginTop:"25px"}} >
            <button onClick={handleFullScreen} className='trailer'>
            Watch Trailer
            </button>
            </div>
            {user ? 
             (!watchadded ?
               (adding ? 
                <div style={{display:"flex",zIndex:"3",marginTop:"25px"}} >
              <button onClick={handleWatch} className='trailer'>
            <Loader/>
            </button>
            </div>
            :
            <div style={{display:"flex",zIndex:"3",marginTop:"25px"}} >
              <button onClick={handleWatch} className='trailer'>
            Add to Watchlist
            </button>
            </div>
               )
            :
            <div style={{display:"flex",zIndex:"3",marginTop:"25px"}} >
              <button onClick={handleWatch} className='trailer' disabled style={{opacity:"0.5"}}> 
              Already added
            </button>
            </div>
             )
            :
            <div style={{display:"flex",zIndex:"3",marginTop:"25px"}} >
              <button onClick={handleWatch} className='trailer' disabled style={{opacity:"0.5"}}> 
            Add to Watchlist
            </button>
            </div>
            }
            </div>
          )}
         </div>
    <div className='similar-and-details'>
        {/* <a className='details' onClick={() => setIsSimilar(true)}>Similar</a>
        <a style={{filter:"brightness(0.3)"}} onClick={() => setIsSimilar(false)} >Details</a> */}
        <h4 className={`option ${selectedOption === 'similar' ? 'selected' : 'dim'}`} onClick={() => handleOptionClick('similar')}>Similar</h4>
        <h4 className={`option ${selectedOption === 'details' ? 'selected' : 'dim'}`} onClick={() => handleOptionClick('details')}>Details</h4>
    </div>
    </div>
    
    : <Loader/>
    }
        {movdata ?
        (isSimilar ? 
        <Moviepage2 items={movdata}></Moviepage2> 
        : <Moviepage3 items={movdata} data="movie"/>
        )
        : 
        ""
}
 
</>
  )
  }
