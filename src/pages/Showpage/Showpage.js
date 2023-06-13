import React,{useContext, useEffect,useState} from 'react'
import Loader from '../../components/loader'
// import Select from 'react-select'
import { useLocation, useParams } from 'react-router-dom';
import Episodes from './Episodes';
import '../../styles/showpage.css'
import Moviepage2 from '../Moviepage/Similar';
import Showsimilar from '../../components/Showsimilar';

import Moviepage3 from '../Moviepage/Details';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import LazyLoad from 'react-lazy-load';
import Navbar from '../../components/Navbar';

export default function Showpage(props) {
  
  const {user , loggedin}=useContext(UserContext);
    const [showdata,setShowdata]=useState(null);
    const [episode,setEpisode]=useState(null)
    const [currentseason,setCurrentseason]=useState("1");
    const [selectedOption, setSelectedOption] = useState('option1');
    const [watchadded,setWatchadded]=useState(false);
    const [adding,setAdding]=useState(false);
    const [watchdata,setWatchdata]=useState({
      id:'',
      image:"",
      name:"",
      date:"",
      rating:"",
      type:"tv"
    })
    
    const {id}=useParams();
    // console.log(props.items);
  
    const handleSelectChange = (event) => {
        // console.log("epidoesssssss",(event.target.value.innerText));

        const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedOptionText = selectedOption.innerText;
        setCurrentseason(selectedOptionText.split(" ")[1]);
      };
      const handleOptionClick = (option) => {
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
        const fetchshowPage = async () => {
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/tv/${id}?language=en-US&append_to_response=videos,credits,similar,recommendations`,
              props.options
            );
            const data = await response.json();
            setShowdata(data);
            setWatchdata({
              id:data.id,
              image:data.poster_path,
              name:data.name,
              date:data.release_date,
              rating:data.vote_average,
              type:"tv"
            })
            
            
          } catch (err) {
            console.log(err);
          }
        };
        fetchshowPage();
      },[id,props.options]);

      useEffect(()=>{
        const fetchepisode = async () => {
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/tv/${id}/season/${currentseason}?language=en-US`,
              props.options
            );
            const data = await response.json();
            setEpisode(data);
            console.log("episode",episode);
          } catch (err) {
            console.log(err);
          }
        };
        fetchepisode();
      },[showdata,props.options,currentseason]);
      const handleWatch = ()=>{
        if(user){
          setAdding(true);
          console.log(user);
          axios({
            url: `${process.env.REACT_APP_HOST}/add`,withCredentials: true,
            method: "POST",
            data: watchdata,
      
          })
          .then((res) => {console.log(res);})
          
          // Catch errors if any
          .catch((err) => { })
          .finally(() => {
            setAdding(false);
            console.log("Adding completed. adding value:", adding);
          });
          
        }
          }
      if(showdata){
          var options = showdata.seasons;
        }
  return (
    <>
    <Navbar/>
    { episode && showdata ?
        <div className="backdrop" >
            <img src={`https://image.tmdb.org/t/p/original${showdata.backdrop_path}`} className='backdrop' alt=''/>
            <div className='movieDetails'>
                <h1 >{showdata.name}</h1>
                <select style={{width:"200px",height:"30px",fontSize:"20px",marginTop:"2rem"}} onChange={handleSelectChange}>
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                            {option.name}
                            </option>
                        ))}
                </select>
                <h3>{episode.overview ? episode.overview : showdata.overview}</h3>
            <div style={{display:"flex",zIndex:"3",color:'white',gap:"3rem",fontWeight:"500",marginTop:"25px"}}>
            <h4><a href="http://imdb.com" className="imdb-logo">{`IMDb : 6.2`}</a></h4>
                {/* <p>IMDB : 6.4</p> */}
                <h4>{episode.air_date.split("-")[0]}</h4>
                <h4>{episode.episodes.length} Episodes</h4>
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
        <div style={{position:"relative",justifyContent:"center",display:"flex",gap:"2rem",fontSize:"1.5rem",color:"white",bottom:"50px",zIndex:"3"}} className='bottom-parameters'>
            <h4 className={`option ${selectedOption === 'option1' ? 'selected' : 'dim'}`} onClick={() => handleOptionClick('option1')}>Episodes</h4>
            <h4 className={`option ${selectedOption === 'option2' ? 'selected' : 'dim'}`} onClick={() => handleOptionClick('option2')}>Similar</h4>
            <h4 className={`option ${selectedOption === 'option3' ? 'selected' : 'dim'}`} onClick={() => handleOptionClick('option3')}>Details</h4>
        </div>
        </div>   
            : < Loader/> 
        }  
        {selectedOption==='option1' ?
        <div>
            {episode ? episode.episodes.map((e)=>{
            return(
              <LazyLoad offset={50}>
                <Episodes items={e} key={e.id}/>
              </LazyLoad>
                )
            }) : <Loader/>
        }
        </div>
            : (selectedOption==='option2' ? 
            <div>
                <Showsimilar items={showdata} /> 
            </div>
                : 
                <div>
                <Moviepage3 items={showdata} data="tv"/>
                </div>
                )
        }
    </>
    )
}
