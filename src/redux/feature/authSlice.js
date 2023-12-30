import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:"auth",
    initialState:{
        credentialData:null,
        signupData:null,
        token:localStorage.getItem("token") ? localStorage.getItem("token") : null,
        loading : false,
    },
    reducers:{
        setCredentialData : (state, action) => {
            state.credentialData = action.payload;
        },
        setSignupData : (state, action) => {
            state.signupData = action.payload;
        },
        setToken : (state, action) => {
            state.token = action.payload;
        },
        setLoading : (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const {setCredentialData, setSignupData, setToken, setLoading} = authSlice.actions;
export default authSlice.reducer;