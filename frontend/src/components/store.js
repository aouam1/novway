import { configureStore } from "@reduxjs/toolkit";
import interventionReducer from "../features/InterventionSlice";
import userReducer from "../features/userSlice";


export default configureStore({
  reducer: {
    intervention: interventionReducer,
    user:userReducer
  },
});