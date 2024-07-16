import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../config/axios";
import { RootState } from '../store';

interface User {
  name: string;
  email: string;
  userId: string;
  token: string;
}

interface AuthState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  message: string;
  agreePolicy: boolean;
  loading: boolean;
  err: string;
  done: boolean;
  emailSent: boolean | null;
  signup: boolean | null;
  routeLoading: boolean;
  isLogged: boolean | null;
  token: string;
  userId: string;
}

const initialState: AuthState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  message: "",
  agreePolicy: false,
  loading: false,
  err: "",
  done: false,
  emailSent: null,
  signup: null,
  routeLoading: true,
  isLogged: null,
  token: "",
  userId: "",
};

export const SignIn = createAsyncThunk(
  "/user/signIn",
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("/auth/signin", user);
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          err: "Network Error",
        });
      }
    }
  }
);


export const NewUser = createAsyncThunk(
  "user/signUp",
  async (user: { email: string; password: string, name: string }, thunkAPI) => {
    try {
      const response = await axios.post("/auth/signUp", user);
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          err: "Network Error",
        });
      }
    }
  }
);

export const SendEmail = createAsyncThunk(
  "sendEmail",
  async (email: string, thunkAPI) => {
    try {
      const response = await axios.post("/auth/forgetpassword", { email });
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          err: "Network Error",
        });
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/user/resetPassword",
  async (user: { password: string; token: string }, thunkAPI) => {
    try {
      const response = await axios.put(
        "/auth/resetpassword",
        { password: user.password },
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      );
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          err: "Network Error",
        });
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetState(state, action: PayloadAction<{ field: keyof AuthState; value: any }>) {
      const { field, value } = action.payload;
      (state[field] as any) = value;
    },
    ClearState(state) {
      return {
        ...initialState,
        routeLoading: state.routeLoading,
      };
    },
    logout(state) {
      return {
        ...initialState,
        routeLoading: state.routeLoading, 
        isLogged: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(SignIn.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.name = user.name;
        state.email = user.email;
        state.userId = token.id;
        state.token = token.token;
        state.loading = false;
        state.done = true;
        state.isLogged = true;
      })
      .addCase(SignIn.rejected, (state, action) => {
        state.loading = false;
        state.err = (action.payload as { err: string }).err;
      })
      .addCase(NewUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(NewUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.name = user.name;
        state.email = user.email;
        state.userId = token.userId;
        state.token = token.token;
        state.message = token;
        state.loading = false;
        state.isLogged = true;
        state.err = "";
        state.signup = true;
      })
      .addCase(NewUser.rejected, (state, action) => {
        state.loading = false;
        state.err = (action.payload as { err: string }).err;
      })
      .addCase(SendEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(SendEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.err = "";
        state.emailSent = true;
        state.message = action.payload;
      })
      .addCase(SendEmail.rejected, (state, action) => {
        state.loading = false;
        state.err = (action.payload as { err: string }).err;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.err = "";
        state.done = true;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.done = false;
        state.err = (action.payload as { err: string }).err;
      });
  },
});

export const { SetState, ClearState, logout } = authSlice.actions;

export default authSlice.reducer;
