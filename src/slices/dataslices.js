import { createSlice } from "@reduxjs/toolkit";


export const slice = createSlice({
  name: 'maindata',
  initialState: {
    movItems: [],
    showItems:[],
    loading:true
  },
  reducers: {
    getMov: (state,action) => {
        console.log(action.payload);
      state.movItems = action.payload;
    },
    getShow: (state,action) => {
      state.showItems = action.payload;
    },
    setLoading:(state,action)=>{
        state.loading=action.payload;
    }
  },
});

export const { getMov, getShow,setLoading } = slice.actions;


// export const {movItems,showItems} =  slice.maindata;

export default slice.reducer;
