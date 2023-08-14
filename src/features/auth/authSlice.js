import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from "axios"

const initialState = {
    data: null,
    loading: false,
    error: null,
    msg: null,
    token: null,
    isVerified: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthData.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAuthData.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.loading = false;
                    state.data = action.payload;
                    state.error = !action.payload.status;
                    state.msg = action.payload.msg;
                    state.token = action.payload.token || null;
                    // state.isVerified = action.payload.isVerified;
                    localStorage.setItem("surveyApp", action.payload.token);
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = action.payload.msg;
                }
            })
            .addCase(fetchAuthData.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = action.error.message;
            });
    },
});

export const fetchAuthData = createAsyncThunk('auth/fetchData', async (apiData) => {
    try {
        const { apiUrl, bodyOfRequest, method } = apiData
        let response
        if (method === 'GET') {
            response = await axios.get(apiUrl);
        } else if (method === 'POST') {
            response = await axios.post(apiUrl, bodyOfRequest);
        }
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});

export default authSlice.reducer; 
