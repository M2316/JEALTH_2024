import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userKey: "",
    email: "",
    profileImage: "",
    name: "",
    nickname: "",
};

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        getUserInfo: (state, action) => {
            state = {
                ...state,
                ...action.payload
            }
        },
    },
});

export const { getUserInfo } = userAuthSlice.actions;

export default userAuthSlice.reducer;