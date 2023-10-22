import { configureStore } from '@reduxjs/toolkit';
import maindataReducer from '../slices/dataslices';
import userdataReducer from '../slices/authslice';

export default configureStore({
  reducer: {
    maindata: maindataReducer,
    userdata:userdataReducer
  },

});