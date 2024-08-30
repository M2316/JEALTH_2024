import { configureStore } from "@reduxjs/toolkit";
import routineManageSlice from "./reducers/health/routineManageSlice";
import workoutRecordSlice from "./reducers/health/workoutRecordSlice";
import calendarSlice from "./reducers/calendarSlice";
import userAuthSlice from "./reducers/user/userAuthSlice";


const store = configureStore({
    reducer:{
        routineManage:routineManageSlice,
        workoutRecord:workoutRecordSlice,
        calendar:calendarSlice,
        userAuth:userAuthSlice
    }
})

export default store;