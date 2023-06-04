import React,{useEffect,useState} from 'react'
import Loader from './loader'
// import Select from 'react-select'
import { useParams } from 'react-router-dom';
import Episodes from './Episodes';
import '../styles/showpage.css'
import Moviepage2 from './Similar';
import Showsimilar from './Showsimilar';
import Showdetails from './Showdetails';
import Moviepage3 from './Details';
export default function Showpage(props) {
    const [showdata,setShowdata]=useState(null);
    const [episode,setEpisode]=useState(null)
    const [currentseason,setCurrentseason]=useState("1");
    const [selectedOption, setSelectedOption] = useState('option1');
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
    useEffect(()=>{
        const fetchshowPage = async () => {
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/tv/${id}?language=en-US&append_to_response=videos,credits,similar,recommendations`,
              props.options
            );
            const data = await response.json();
            setShowdata(data);
            console.log(showdata);
            
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

      if(showdata){
          var options = showdata.seasons;
        }
  return (
    <>
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
            <h4><a href="http://imdb.com" class="imdb-logo">{`IMDb : 6.2`}</a></h4>
                {/* <p>IMDB : 6.4</p> */}
                <h4>{episode.air_date.split("-")[0]}</h4>
                <h4>{episode.episodes.length} Episodes</h4>
            </div>  
            </div>
         
              {/* : (
                  <div style={{display:"flex",position:"absolute",zIndex:"3",top:"65%",left:"10%"}} >
                  <button onClick={handleFullScreen} className='trailer'>
                  Watch Trailer
                  </button>
                  </div>
                )} */}
        <div style={{position:"relative",left:"40%",display:"flex",gap:"2rem",fontSize:"1.5rem",color:"white",bottom:"50px",zIndex:"3"}} className='bottom-parameters'>
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
                <Episodes items={e} key={e.id}/>
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
