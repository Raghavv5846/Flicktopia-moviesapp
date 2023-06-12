// // UserContext.js
// import axios from 'axios';
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import Loader from '../components/loader';
// import Moviepage from '../components/Moviepage';
// import Showpage from '../components/Showpage';
// import Mainpage from './Mainpage';

// export const UserContext = createContext();
// export default function Usercontext() {
//     console.log("protecteddddddddddddddddd");
    
//     const [loggedin,setLoggedin]=useState(false);
//     const [user,setUser]=useState(null);
//   const [loading,setLoading]=useState(true);
//   useEffect(()=>{
//     axios({url: "http://localhost:8000/protected",withCredentials: true,})
//         // Handle the response from backend here
//         .then((res) => {
//             console.log(res.data);
//             if(res.data.status==='success'){
//               setLoggedin(true);
//               setUser(res.data.user);
//             }
//             setLoading(false);
//         })
//         // Catch errors if any
//         .catch((err) => { });
        
//     },[loggedin]);
    
//     return <UserContext.Provider value={{ loggedin, user, loading }}>
//     <Mainpage/>
//     <Moviepage/>
//     <Showpage/>
//     </UserContext.Provider>;

// // return 
// // <div>
// // <Loader/>
// // </div>
// }