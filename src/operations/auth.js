import { toast } from "react-toastify";
import { setloggedin, setuser } from "../slices/authslice";
import axios from "axios";
import { setLoading } from "../slices/dataslices";

export function usersignin(formData,navigate){
    return async(dispatch)=>{
        const id = toast.loading("Signing in...");
        console.log("laskdklasjdl");
    axios({
        url: `${process.env.REACT_APP_HOST}/sign-in/create-session`,
        method: "POST",
        // Attaching the form data
        
        headers: {
          'Content-Type': 'application/json',
          'Accept':'*'
      },
      withCredentials:true,
      data: formData,
        
    })
    .then((res) => {
      
      console.log("response ahs been recieved",res);
          if(res.data.status==='success'){
            toast.update(id, { render: "Logged in", type: "success", isLoading: false,closeOnClick:true });
          dispatch(setloggedin(true));
          dispatch(setuser(res.data.user));
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
    }

export function checkProtected(){
    return async (dispatch)=>{
        axios({url: `${process.env.REACT_APP_HOST}/protected`,withCredentials: true,
})
        // Handle the response from backend here
        .then((res) => {
            console.log(res.data);
            if(res.data.status==='success'){
              dispatch(setuser(res.data.user));
              console.log("userr",res.data.user);
              if(res.data.user){
                dispatch(setloggedin(true));
              }
            }
            dispatch(setLoading(false));
        })
        // Catch errors if any
        .catch((err) => { dispatch(setLoading(false))});
    }
}
export function remove(removeId){
    return async (dispatch)=>{
        axios({url: `${process.env.REACT_APP_HOST}/remove`,method:"Post",withCredentials: true,data:{ removeId}
})
        // Handle the response from backend here
        .then((res) => {
            console.log(res.data);
            
        })
        // Catch errors if any
        .catch((err) => { throw err;});
    }
}