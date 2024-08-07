import { configureStore } from "@reduxjs/toolkit";
import routineManageSlice from "./reducers/routineManageSlice";
import workoutRecordSlice from "./reducers/workoutRecordSlice";
import calendarSlice from "./reducers/calendarSlice";


const store = configureStore({
    reducer:{
        routineManage:routineManageSlice,
        workoutRecord:workoutRecordSlice,
        calendar:calendarSlice,
    }
})

export default store;