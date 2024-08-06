import { configureStore } from "@reduxjs/toolkit";
import routineManageSlice from "./reducers/routineManageSlice";


const store = configureStore({
    reducer:{
        routineManage:routineManageSlice
    }
})

export default store;