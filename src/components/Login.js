import React,{useContext, useEffect,useState} from 'react'
import '../styles/signin.css'
import Navbar from './Navbar';
import '../styles/navbar.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


export default function Signin() {
    const [formData,setFormData]=useState({
        email:'',
        password:'',
    })
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();
    const [message,setMessage]=useState("");
    const {handleSubmit}=useContext(UserContext);
        const forms = document.querySelector(".forms");
        const pwShowHide = document.querySelectorAll(".eye-icon");
        const links = document.querySelectorAll(".link");
        pwShowHide.forEach((eyeIcon) => {
            eyeIcon.addEventListener("click", () => {
                let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
                
                pwFields.forEach(password => {
                    if(password.type === "password"){
                        password.type = "text";
                        eyeIcon.classList.replace("bx-hide", "bx-show");
                        return;
                    }
                    password.type = "password";
                    eyeIcon.classList.replace("bx-show", "bx-hide");
                })
                
            })
        }) 
        // useEffect(()=>{
            useEffect(()=>{
                axios({url: "http://localhost:8000/protected",withCredentials: true,})
                    // Handle the response from backend here
                    .then((res) => {
                        console.log(res.data);
                        if(res.data.status==='success'){
                            navigate('/');
                        }
                    })
                    // Catch errors if any
                    .catch((err) => { });
        
            },[])
            const handleFormSubmit=(e)=>{
                e.preventDefault();
                handleSubmit(formData,navigate);
            }
        // })
        // const handleSubmit=(e)=>{
        //     e.preventDefault();
        //     axios({
        //         url: "http://localhost:8000/sign-in/create-session",
        //         method: "POST",
        //         // Attaching the form data
        //         data: formData,
        //         withCredentials: true,
        //     })
     
        //         // Handle the response from backend here
        //         .then((res) => {
        //         if(res.data.status==='success'){
        //             setTimeout(() => {
        //                 navigate('/');
        //             }, 3000);
        //         }
        //         })
     
        //         // Catch errors if any
        //         .catch((err) => { });
        //     }
            
        const handleChange = (event) => {

            setFormData({
              ...formData,
              [event.target.name]: event.target.value
            });
          }; 


  return (
    <>
    <Navbar/>
    <section className="signincontainer forms">
            <div className="form login">
                <div className="form-content">
                    <header>Login</header>
                    <form action="http://localhost:8000/sign-in/create-session" method='post' onSubmit={handleFormSubmit}>
                        <div className="field input-field">
                            <input type="email" placeholder="Email" className="input" name='email' onChange={handleChange}/>
                        </div>
                        <div className="field input-field">
                            <input type="password" placeholder="Password" className="password" name='password' onChange={handleChange}/>
                            <i className='bx bx-hide eye-icon' ></i>
                        </div>
                        <div className="form-link">
                            <a href="#" className="forgot-pass">Forgot password?</a>
                        </div>
                        <div className="field button-field">
                            <button>Login</button>
                        </div>
                    </form>
                    <div className="form-link">
                        <span>Don't have an account? <a href="#" className="link signup-link">Signup</a></span>
                    </div>
                </div>
                <div className="line"></div>
                <div className="media-options">
                    <a href="#" className="field facebook">
                        <i className='bx bxl-facebook facebook-icon'></i>
                        <span>Login with Facebook</span>
                    </a>
                </div>
                <div className="media-options">
                    <a href="#" className="field google">
                        <img src="#" alt="" className="google-img"/>
                        <span>Login with Google</span>
                    </a>
                </div>
            </div>
            </section>
    </>
  )
}
