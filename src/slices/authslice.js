import { createSlice } from "@reduxjs/toolkit";
// const [loggedin,setLoggedin]=useState(false);
// const [user,setUser]=useState(null);
// const [loading,setLoading]=useState(true);

export const slice = createSlice({
  name: 'authdata',
  initialState: {
    loggedin: false,
    user:null,
    userLoading:false
  },
  reducers: {
    setloggedin: (state,action) => {
        console.log(action.payload);
      state.loggedin = action.payload;
    },
    setuser: (state,action) => {
      state.user = action.payload;
    },
    setuserloading:(state,action)=>{
        state.userLoading=action.payload;
    }
  },
});

export const { setloggedin, setuser,setuserloading } = slice.actions;


// export const {movItems,showItems} =  slice.maindata;

export default slice.reducer;
