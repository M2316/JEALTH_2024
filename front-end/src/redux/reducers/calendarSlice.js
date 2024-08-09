import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
    strDate: null,
    year: null,
    month: null,
    date: null,
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        //날짜 선택
        selectedDateCahnge: (state, action) => {
            state.strDate = action.payload;
            let date = dayjs(action.payload);
            state.year = date.format("YYYY");
            state.month = date.format("MM");
            state.date = date.format("DD");
        },
    },
});

export const { selectedDateCahnge } = calendarSlice.actions;
export default calendarSlice.reducer;
