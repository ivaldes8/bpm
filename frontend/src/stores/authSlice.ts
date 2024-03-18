import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, store } from "./store";
import { User } from "@prisma/client";
import storage from "@/utils/storage";
import handlePromise from "@/utils/promise";
import api from "../utils/api/useApi";
import AuthService from "@/services/AuthService";
import _ from "lodash";


export const login = createAsyncThunk('auth/login', async (formData: any, thunkAPI) => {
    const [error, response, data] = await handlePromise(
        AuthService.loginUser(formData)
    );
    if (!response.ok) {
        return thunkAPI.rejectWithValue(error)
    }

    return data
})

export const getUserData = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
    const [error, response, data] = await handlePromise(
        AuthService.getUserProfile()
    );
    if (!response.ok) {
        return thunkAPI.rejectWithValue(error)
    }

    return data
})


interface UserState {
    user: User | null;
    userData: any | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const initialState: UserState = {
    user: typeof localStorage !== 'undefined' ? _.get(storage.get(), 'user') : null,
    userData: typeof localStorage !== 'undefined' ? _.get(storage.get(), 'userData') : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
        logout: (state) => {
            state.user = null
            state.userData = null
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            storage.clear()
            window.location.replace('/login')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                storage.set(JSON.stringify({ user: state.user }))
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = `${action.payload}`
                state.user = null
            })

            //getProfile
            .addCase(getUserData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userData = action.payload

                storage.set(JSON.stringify({
                    user: state.user,
                    userData: state.userData
                }))
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = `${action.payload}`
                state.userData = null
            })
    }
});

export const { reset, logout } = authSlice.actions

export const selectUser = (state: RootState) => {
    return state.auth.user;
};

export default authSlice.reducer;
