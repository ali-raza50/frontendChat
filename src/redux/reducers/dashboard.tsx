import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../config/axios";
import { RootState } from '../store';

interface User {
    name: string;
    email: string;
    userId: string;
    token: string;
}

interface DashboardState {
    loading: boolean;
    err: string;
    isLogged: boolean | null;
    done: boolean
    requests: {
        receivedRequests: any,
        sentRequests: any,
    }
    contacts: any
}

const initialState: DashboardState = {
    loading: false,
    err: "",
    done: false,
    isLogged: null,
    requests: {
        receivedRequests: [],
        sentRequests: []
    },
    contacts: []
};

export const sendingFriendRequest = createAsyncThunk(
    "/user/sendingFriendRequest",
    async (recipientEmail: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state?.auth?.token;
            const response = await axios.post("/users/send-request", { recipientEmail }, {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue({
                    err: err.response.data,
                    status: err.response.status,
                });
            } else {
                return rejectWithValue({
                    err: "Network Error",
                });
            }
        }
    }
);

export const getAllRequest = createAsyncThunk(
    "/user/getAllRequest",
    async (data, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state?.auth?.token;
            const response = await axios.get("/users/get-all-requests", {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue({
                    err: err.response.data,
                    status: err.response.status,
                });
            } else {
                return rejectWithValue({
                    err: "Network Error",
                });
            }
        }
    }
);
export const getAllContacts = createAsyncThunk(
    "/user/getAllContacts",
    async (data, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state?.auth?.token;
            const response = await axios.get("/users/get-all-contacts", {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue({
                    err: err.response.data,
                    status: err.response.status,
                });
            } else {
                return rejectWithValue({
                    err: "Network Error",
                });
            }
        }
    }
);

export const acceptingRequest = createAsyncThunk(
    "/user/acceptingRequest",
    async (requestId: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state?.auth?.token;
            const response = await axios.post("/users/accept-request", { requestId }, {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue({
                    err: err.response.data,
                    status: err.response.status,
                });
            } else {
                return rejectWithValue({
                    err: "Network Error",
                });
            }
        }
    }
);

export const rejectingRequest = createAsyncThunk(
    "/user/rejectingRequest",
    async (requestId: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state?.auth?.token;
            const response = await axios.put("/users/reject-request", { requestId }, {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });
            return response.data;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue({
                    err: err.response.data,
                    status: err.response.status,
                });
            } else {
                return rejectWithValue({
                    err: "Network Error",
                });
            }
        }
    }
);


const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        SetState(state, action: PayloadAction<{ field: keyof DashboardState; value: any }>) {
            const { field, value } = action.payload;
            (state[field] as any) = value;
        },
        ClearState(state) {
            return {
                ...initialState,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendingFriendRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendingFriendRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.done = true;
                // state.bodyCorporateUsers = action.payload;
            })
            .addCase(sendingFriendRequest.rejected, (state, action) => {
                state.loading = false;
                state.err = (action.payload as { err: string }).err;
            })
            .addCase(getAllRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.done = true;
                state.requests = action.payload;
            })
            .addCase(getAllRequest.rejected, (state, action) => {
                state.loading = false;
                state.err = (action.payload as { err: string }).err;
            })
            .addCase(getAllContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.done = true;
                state.contacts = action.payload.contacts;
            })
            .addCase(getAllContacts.rejected, (state, action) => {
                state.loading = false;
                state.err = (action.payload as { err: string }).err;
            })
            .addCase(acceptingRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(acceptingRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.done = true;
            })
            .addCase(acceptingRequest.rejected, (state, action) => {
                state.loading = false;
                state.err = (action.payload as { err: string }).err;
            })
            .addCase(rejectingRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(rejectingRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.done = true;
            })
            .addCase(rejectingRequest.rejected, (state, action) => {
                state.loading = false;
                state.err = (action.payload as { err: string }).err;
            })
    },
});

export const { SetState, ClearState } = dashboardSlice.actions;

export default dashboardSlice.reducer;
