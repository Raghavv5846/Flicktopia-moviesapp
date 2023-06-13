import React, { useEffect, useState } from 'react'
import '../../styles/signin.css'
import Navbar from '../../components/Navbar';
import '../../styles/navbar.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

// import ScriptTag from 'react-script-tag';
export default function Signup() {
    const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        confirm_password:''
    })
    useEffect(()=>{
        axios({url: `${process.env.REACT_APP_HOST}/protected`,withCredentials: true,})
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
    const [message,setMessage]=useState("");
        
        const forms = document.querySelector(".forms");
        const pwShowHide = document.querySelectorAll(".eye-icon");
        const submit=document.querySelector('#signup');
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
            const handleSubmit=(e)=>{
                e.preventDefault();
                axios({
                    url: `${process.env.REACT_APP_HOST}/sign-in/create`,
                    method: "POST",
                    headers: {
         
                        // Add any auth token here
                        authorization: "your token comes here",
                    },
         
                    // Attaching the form data
                    data: formData,
                })
         
                    // Handle the response from backend here
                    .then((res) => {setMessage(res)})
         
                    // Catch errors if any
                    .catch((err) => { });
                }
                useEffect(()=>{
                    if(message==='right'){
                        console.log("gggggggggggggggggggggggggg");
                        setIsRegistered(true);
                        navigate('/sign-in')
                    }
                },[message])
            const handleChange = (event) => {

                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value
                });
              }; 
              console.log(message);
return (
    <>
    <Navbar/>
            {/* <!-- Signup Form --> */}
            <section className="signincontainer forms">
            <div className="form signup">
                <div className="form-content">
                    <header>Signup</header>
                    <form action={`${process.env.REACT_APP_HOST}/sign-in/create`} method='post' onSubmit={handleSubmit}>
                    <div className="field input-field">
                            <input type="text" placeholder="Name" className="input" name='name' value={formData.name} onChange={handleChange}/>
                        </div>
                        <div className="field input-field">
                            <input type="email" placeholder="Email" className="input" name='email' value={formData.email} onChange={handleChange}/>
                        </div>
                        <div className="field input-field">
                            <input type="password" placeholder="Create password" className="password" name='password' value={formData.password} onChange={handleChange}/>
                        </div>
                        <div className="field input-field">
                            <input type="password" placeholder="Confirm password" className="password" name='confirm_password' value={formData.confirm_password} onChange={handleChange}/>
                            <i className='bx bx-hide eye-icon'></i>
                        </div>
                        <div className="field button-field">
                            
                            <button type='submit' id='signup'>Signup</button>
                            
                        </div>
                    </form>
                    <div className="form-link">
                        <span>Already have an account? <a href="#" className="link login-link">Login</a></span>
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
