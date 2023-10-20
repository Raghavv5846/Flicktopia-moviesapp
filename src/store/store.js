import { configureStore } from '@reduxjs/toolkit';
import maindataReducer from '../slices/dataslices';
export default configureStore({
  reducer: {
    maindata: maindataReducer
  },

});