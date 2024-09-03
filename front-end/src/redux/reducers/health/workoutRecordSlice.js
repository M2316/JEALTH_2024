import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    workoutInfo: [
        {
            id: null,
            workoutDate: null,
            name: null,
            tagLevel1: null,
            tagLevel2: null,
            tagLevel3: null,
            scoreList: [
                {
                    setNum: null,
                    weight: null,
                    weightUnit: null,
                    count: null,
                    countUnit: null,
                    setDoneFlag: false,
                },
            ],
        },
    ],
};
export const workoutRecordSlice = createSlice({
    name: "workoutRecord",
    initialState,
    reducers: {
        //record정보 초기화
        routineRecordListInit: (state, action)=>{
            state.workoutInfo = action.payload;
        },
        //세트 스코어 수정
        routineRecordUpdate: (state, action) => {
            const selectedDate = action.payload.workDate;
            const recordRoutineId = action.payload.healthRoutineRecordId;
            const recordSetNum = action.payload.setNum;

            let selectedRecord = state.workoutInfo
            .find((findItem) => findItem.id === recordRoutineId && findItem.workoutDate === selectedDate)
            .scoreList.find((findId) =>  findId.setNum === recordSetNum);

            selectedRecord.weight = action.payload.weight;
            selectedRecord.weightUnit = action.payload.weightUnit;
            selectedRecord.count = action.payload.count;
            selectedRecord.countUnit = action.payload.countUnit;
        },
        //기존 세트를 카피해서 다음 세트 추가 
        routineRecordAppend: (state, action) => {
            const selectedDate = action.payload.workDate;
            const recordRoutineId = action.payload.id;


            const selectedRoutineLastSetInfo = state.workoutInfo
                .find((findItem) => findItem.workoutDate === selectedDate && findItem.id === recordRoutineId)
                .scoreList.slice(-1)[0];

            //전세트 정보를 넣어줌
            state.workoutInfo
                .find((findItem) => findItem.workoutDate === selectedDate && findItem.id === recordRoutineId)
                .scoreList.push({
                    ...selectedRoutineLastSetInfo,
                    setDoneFlag: false,
                    setNum: selectedRoutineLastSetInfo.setNum + 1,
                });
        },
        recordDoneChange: (state, action) => {
            const { routineId, recordSetNum, flag } =
                action.payload;

                state
                .workoutInfo.find(
                    (findItem) => findItem.id === routineId
                )
                .scoreList.find(findSet=> findSet.setNum === recordSetNum)
                .setDoneFlag = flag;
        },
        recordDelete: (state, action) => {
            const { healthRoutineRecordId, setNum} = action.payload;

            let deleteRoutineRecord = state
            .workoutInfo.find(
                (findItem) => findItem.id === healthRoutineRecordId
            )
            .scoreList.filter((findId) => findId.setNum !== setNum)
            .map((item, idx) => ({
                ...item,
                setNum: idx + 1,
            }));

            if (deleteRoutineRecord.length > 0) {
                //record setNum 1 이상이면 수행
                state.workoutInfo
                    .find(
                        (findItem) =>
                            findItem.id === healthRoutineRecordId
                    ).scoreList = deleteRoutineRecord;
            } else {

                state.workoutInfo = state.workoutInfo.filter((findItem) => findItem.id !== healthRoutineRecordId);
                
            }
        },   
        recordAllDoneFlagChange : (state, action)=>{

            const requestRoutineId = action.payload.id;
            const requestFlag = action.payload.doneFlag;

            state.workoutInfo.find(findItem => findItem.id === requestRoutineId).scoreList.map(item=>item.setDoneFlag = requestFlag);

        }
    } 
});

export const {
    routineRecordListInit,
    routineListAppend,
    routineRecordUpdate,
    routineRecordAppend,
    recordDoneChange,
    recordDelete,
    recordAllDoneFlagChange,

} = workoutRecordSlice.actions;

export default workoutRecordSlice.reducer;
