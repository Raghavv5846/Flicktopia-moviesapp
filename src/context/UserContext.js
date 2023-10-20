// UserContext.js
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Loader from '../components/loader';
import Moviepage from '../pages/Moviepage/Moviepage';
import Showpage from '../pages/Showpage/Showpage';
import Mainpage from '../pages/Mainpage/Mainpage';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  console.log("protecteddddddddddddddddd");
  console.log({children});
  const [loggedin,setLoggedin]=useState(false);
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  
  
  const handleSubmit=(formData,navigate)=>{
    const id = toast.loading("Signing in...")
    axios({
        url: `${process.env.REACT_APP_HOST}/sign-in/create-session`,
        method: "POST",
        // Attaching the form data
        headers: {
          'Content-Type': 'application/json',
          'Accept':'*'
      },
        data: formData,
        withCredentials:true,
        
        
    })
    .then((res) => {
      
      console.log("response ahs been recieved",res);
          if(res.data.status==='success'){
            toast.update(id, { render: "Logged in", type: "success", isLoading: false,closeOnClick:true });
          setLoggedin(true);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
        else{
          toast.update(id, { render: "Failed! Please Try Again", type: "warn", isLoading: false });
        }
        })
        
        // Catch errors if any
        .catch((err) => {
          console.log(err,"eroorrr");
         })
        .finally(()=>{
          toast.dismiss();
        });
      }
    //   toast.promise(
    //     handleSubmit,
    //     {
    //       pending: 'Promise is pending',
    //       success: 'Promise resolved 👌',
    //       error: 'Promise rejected 🤯'
    //     }
    // )
      useEffect(()=>{
        axios({url: `${process.env.REACT_APP_HOST}/protected`,
    headers:{
    },
    withCredentials: true,})
        // Handle the response from backend here
        .then((res) => {
            console.log(res.data);
            if(res.data.status==='success'){
              setUser(res.data.user);
              console.log("userr",user);
              if(res.data.user){
                setLoggedin(true);
              }
            }
            setLoading(false);
        })
        // Catch errors if any
        .catch((err) => { setLoading(false)});

},[loggedin]);
  return <UserContext.Provider value={{loggedin,user,loading,handleSubmit}}>
   {children}
    </UserContext.Provider>;

// return 
// <div>
// <Loader/>
// </div>
}
