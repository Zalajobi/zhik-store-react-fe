import { configureStore } from '@reduxjs/toolkit'
import authTokenReducer  from "./redux/Reducers";

export default configureStore({
  reducer: {
    authToken: authTokenReducer,
  },
})