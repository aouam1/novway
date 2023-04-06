import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { login_end_point,  register_end_point } from "../const/constants";

export const logOut = createAction("user/logOut");

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        register_end_point,
        userData,
        {headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers':
            'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'OPTIONS,POST',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '',
          'X-Requested-With': '',
        }}
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        login_end_point,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      // if (!response.ok) {
      //   throw new Error('Server Error');
      // }

      // const data = await response.json();
      // if (data.error) {
      //   throw new Error(data.error);
      // }

      // return data;

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        // Handle different error scenarios based on the status code
        switch (response.status) {
          case 400:
            return rejectWithValue({
              errorType: "emailAndPassword",
              errorMessage: "Email and password are required",
            });
          case 401:
            return rejectWithValue({
              errorType: "password",
              errorMessage: "Invalid password",
            });
          case 404:
            return rejectWithValue({
              errorType: "email",
              errorMessage: "User not found",
            });
          default:
            return rejectWithValue({
              errorType: "general",
              errorMessage: "Server Error",
            });
        }
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loadStateFromLocalStorage = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    return { isLoggedIn: true };
  } else {
    return { isLoggedIn: false };
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    ...loadStateFromLocalStorage(),
    status: "idle",
    error: null,
    message: "",
    emailError: null,
    passwordError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.message = action.payload.message;
      })

      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true; // Add this line
        localStorage.setItem("isLoggedIn", "true");
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          switch (action.payload.errorType) {
            case "emailAndPassword":
              state.emailError = action.payload.errorMessage;
              state.passwordError = action.payload.errorMessage;
              break;
            case "email":
              state.emailError = action.payload.errorMessage;
              break;
            case "password":
              state.passwordError = action.payload.errorMessage;
              break;
            default:
              state.error = action.payload.errorMessage;
          }
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(logOut, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        localStorage.removeItem("isLoggedIn");
      });
  },
});

export default userSlice.reducer;
