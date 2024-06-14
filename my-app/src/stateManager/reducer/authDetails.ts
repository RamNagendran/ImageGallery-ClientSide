import { createSlice } from "@reduxjs/toolkit";


const userSession = createSlice({
    name: "UserSession",
    initialState: {
        userDetails: null,
        authToken: null,
    },
    reducers: {
        setLoginCredentials: (state, action) => {
            state.userDetails = action.payload.userDetails;
            state.authToken = action.payload.authToken;
        },
        clearLoginCredentials: (state) => {
            state.userDetails = null;
            state.authToken = null;
        }
    }
})

export const {setLoginCredentials, clearLoginCredentials} = userSession.actions;
export default userSession.reducer;