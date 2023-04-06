// interventionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { save_intervention_end_point } from "../const/constants";
// import axios from "axios";

const initialState = {
  data: {
    // company: "",
    // fait_generateur: "",
    // ass_tech: "",
    // logiciel: "",
    // tech_du_service: "",
    // representant_entr: "",
    // heur_debut: "",
    // heur_fin: "",
    // duree: "",
    // date: "",
  },
  status: "idle",
  error: null,
  message: null,
};

// Async thunk to send data to the API
export const sendInterventionData = createAsyncThunk(
  "intervention/sendInterventionData",
  async (interventionData, { rejectWithValue }) => {
    try {
      //   console.log("form_data", interventionData);
      //   console.log("sts", initialState);
      const response = await axios.post(
        save_intervention_end_point,
        interventionData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const interventionSlice = createSlice({
  name: "intervention",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendInterventionData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendInterventionData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(sendInterventionData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.message = action.payload.message;
      });
  },
});
export const selectStatus = (state) => state.intervention.status;
export const selectMessage = (state) => state.intervention.message;
export default interventionSlice.reducer;
