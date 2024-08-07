import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    workoutInfo: [
        {
            workoutDate: null,
            workoutList: [
                {
                    workout: {
                        id: null,
                        name: null,
                        workSetList: [
                            {
                                setNum: null,
                                weight: null,
                                count: null,
                                setDoneFlag: false,
                            },
                        ],
                    },
                },
            ],
        },
    ],
};
export const workoutRecordSlice = createSlice({
    name: "workoutRecord",
    initialState,
    reducers: {
        //선택한 운동 종목 루틴에 추가
        routineListAppend: (state, action) => {
            const selectedDate = action.payload.workoutDate;

            const selectedRoutine = action.payload.selectedRoutine;

            //routine record항목에 기록 될 신규 id 부여
            selectedRoutine.map((item) =>{
                return{
                    ...item,
                    id:uuidv4
                }
            });

            const workoutRoutine = {
                workoutDate: selectedDate,
                workoutList: selectedRoutine,
            };

            //선택한 date에 routine이 이미 존재하면 기존 데이터에 append
            let preveworkoutInfo = state.workoutInfo.find(
                (findItem) =>
                    findItem.workoutDate === workoutRoutine.workoutDate
            );

            // let preveworkoutInfo = workoutInfo.find((item)=>item.workoutDate === workoutRoutine.workoutDate);
            if (preveworkoutInfo) {
                //기존 데이터에 추가
                preveworkoutInfo.workoutList = [
                    ...preveworkoutInfo.workoutList,
                    ...workoutRoutine.workoutList,
                ];
                state.workoutInfo = [preveworkoutInfo];
            } else {
                //신규 데이터 추가
                state.workoutInfo.push(workoutRoutine);
            }
        },
    },
});

export const { routineListAppend } = workoutRecordSlice.actions;

export default workoutRecordSlice.reducer;
