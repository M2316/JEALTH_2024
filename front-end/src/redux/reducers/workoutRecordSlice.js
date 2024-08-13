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
                        tagLevel1: null,
                        tagLevel2: null,
                        tagLevel3: null,
                        workSetList: [
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
            const appendRoutine = selectedRoutine.map((item) => ({
                ...item,
                // "id":uuidv4,
                workSetList: [
                    {
                        setNum: 1,
                        weight: 0,
                        weightUnit: "Kg",
                        count: 0,
                        countUnit: "회",
                        setDoneFlag: false,
                    },
                ],
            }));

            const workoutRoutine = {
                workoutDate: selectedDate,
                workoutList: appendRoutine,
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
        routineRecordUpdate: (state, action) => {
            const selectedDate = action.payload.workDate;
            const recordRoutineId = action.payload.id;
            const recordSetNum = action.payload.setNum;

            let selectedRecord = state.workoutInfo
                .find((findItem) => findItem.workoutDate === selectedDate)
                .workoutList.find((findId) => findId.id === recordRoutineId)
                .workSetList.find((findSet) => findSet.setNum === recordSetNum);

            selectedRecord.weight = action.payload.weight;
            selectedRecord.weightUnit = action.payload.weightUnit;
            selectedRecord.count = action.payload.count;
            selectedRecord.countUnit = action.payload.countUnit;
        },
        routineRecordAppend: (state, action) => {
            const selectedDate = action.payload.workDate;
            const recordRoutineId = action.payload.id;

            const selectedRoutineLastSetInfo = state.workoutInfo
                .find((findItem) => findItem.workoutDate === selectedDate)
                .workoutList.find((findId) => findId.id === recordRoutineId)
                .workSetList.slice(-1)[0];

            //전세트 정보를 넣어줌
            state.workoutInfo
                .find((findItem) => findItem.workoutDate === selectedDate)
                .workoutList.find((findId) => findId.id === recordRoutineId)
                .workSetList.push({
                    ...selectedRoutineLastSetInfo,
                    setDoneFlag: false,
                    setNum: selectedRoutineLastSetInfo.setNum + 1,
                });
        },
        recordDoneChange: (state, action) => {
            const { routineId, recordSetNum, flag, selectedDate } =
                action.payload;

            state.workoutInfo
                .find(
                    (findItem) => findItem.workoutDate === selectedDate.strDate
                )
                .workoutList.find((findId) => findId.id === routineId)
                .workSetList.find(
                    (findSet) => findSet.setNum === recordSetNum
                ).setDoneFlag = flag;
        },
        recordDelete: (state, action) => {
            const { routineId, recordSetNum, selectedDate } = action.payload;

            let deleteRoutineRecord = state.workoutInfo
                .find(
                    (findItem) => findItem.workoutDate === selectedDate.strDate
                )
                .workoutList.find((findId) => findId.id === routineId)
                .workSetList.filter(
                    (findSet) => findSet.setNum !== recordSetNum
                )
                .map((item, idx) => ({
                    ...item,
                    setNum: idx + 1,
                }));

            if (deleteRoutineRecord.length > 0) {
                //record setNum 1 이상이면 수행
                state.workoutInfo
                    .find(
                        (findItem) =>
                            findItem.workoutDate === selectedDate.strDate
                    )
                    .workoutList.find(
                        (findId) => findId.id === routineId
                    ).workSetList = deleteRoutineRecord;
            } else {
                //record setNum이 비어있으면 루틴 자체를 삭제
                const workoutList = state.workoutInfo.find((findItem) => findItem.workoutDate === selectedDate.strDate).workoutList.filter((findId) => findId.id !== routineId);

                if(workoutList.length > 0){
                    //workoutList 수가 1개 이상이면 수행
                    state.workoutInfo.find((findItem) => findItem.workoutDate === selectedDate.strDate).workoutList = state.workoutInfo
                    .find(
                        (findItem) =>
                            findItem.workoutDate === selectedDate.strDate
                    )
                    .workoutList.filter((findId) => findId.id !== routineId);

                }else{
                    //workoutList가 비어있으면 그날 루틴 기록 삭제
                    state.workoutInfo = state.workoutInfo.filter((findItem) => findItem.workoutDate !== selectedDate.strDate);
                    
                }
                
            }
        },
    },
});

export const {
    routineListAppend,
    routineRecordUpdate,
    routineRecordAppend,
    recordDoneChange,
    recordDelete,
} = workoutRecordSlice.actions;

export default workoutRecordSlice.reducer;
