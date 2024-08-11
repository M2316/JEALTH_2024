import { createSlice } from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";
const initialState = {
    targetMuscle: [
        { id:uuidv4(), name: "가슴", manageModalView: false, selectorModalView: false },
        { id:uuidv4(),name: "어깨", manageModalView: false, selectorModalView: false },
        { id:uuidv4(),name: "팔", manageModalView: false, selectorModalView: false },
        { id:uuidv4(),name: "등", manageModalView: false, selectorModalView: false },
        { id:uuidv4(),name: "복근", manageModalView: false, selectorModalView: false },
        { id:uuidv4(),name: "하체", manageModalView: false, selectorModalView: false },
    ],
    tagLevel1: ["상체", "하체", "코어"],
    tagLevel2: ["가슴", "어깨", "팔", "등", "복근", "하체"],
    tagLevel3: ["프리웨이트", "머신웨이트", "맨몸웨이트"],
    routineList: [
        {
            id:uuidv4(),
            name: "벤치프레스",
            imgCode: "",
            tagLevel1: "상체",
            tagLevel2: "가슴",
            tagLevel3: "프리웨이트",
        },
        {
            id:uuidv4(),
            name: "덤벨 벤치프레스",
            imgCode: "",
            tagLevel1: "상체",
            tagLevel2: "가슴",
            tagLevel3: "프리웨이트",
        },
        {
            id:uuidv4(),
            name: "체스트 프레스",
            imgCode: "",
            tagLevel1: "상체",
            tagLevel2: "가슴",
            tagLevel3: "머신웨이트",
        },
        {
            id:uuidv4(),
            name: "스쿼트",
            imgCode: "",
            tagLevel1: "하체",
            tagLevel2: "하체",
            tagLevel3: "프리웨이트",
        },
        {
            id:uuidv4(),
            name: "레그익스텐션",
            imgCode: "",
            tagLevel1: "하체",
            tagLevel2: "하체",
            tagLevel3: "머신웨이트",
        },
        {
            id:uuidv4(),
            name: "레그컬",
            imgCode: "",
            tagLevel1: "하체",
            tagLevel2: "하체",
            tagLevel3: "머신웨이트",
        },
        {
            id:uuidv4(),
            name: "행잉 레그 레이즈",
            imgCode: "",
            tagLevel1: "코어",
            tagLevel2: "복근",
            tagLevel3: "프리웨이트",
        },
        {
            id:uuidv4(),
            name: "케이블 크런치",
            imgCode: "",
            tagLevel1: "코어",
            tagLevel2: "복근",
            tagLevel3: "머신웨이트",
        },
        {
            id:uuidv4(),
            name: "크런치",
            imgCode: "",
            tagLevel1: "코어",
            tagLevel2: "복근",
            tagLevel3: "맨몸웨이트",
        },
    ],
};

export const routineManageSlice = createSlice({
    name: "routineManage",
    initialState,
    reducers: {
        //루틴 종목 리스트 열기
        targetMuscleOpenControl: (state, action) => { 
            switch(action.payload.type){
                case "manage":
                    state.targetMuscle.map((item)=>{
                        if(item.name === action.payload.name){
                            item.manageModalView = !item.manageModalView;
                        }else{
                            item.manageModalView = false;
                        }
                    })
                    break;
                case "selector":
                    state.targetMuscle.map((item)=>{
                        if(item.name === action.payload.name){
                            item.selectorModalView = !item.selectorModalView;
                        }else{
                            item.selectorModalView = false;
                        }
                    })
                    break;
            }
        },
        //신규 루틴 종목 추가
        RoutineListAdd : (state, action) => { 

            let tagLevel1 = "";


            if(["가슴", "어깨", "팔", "등"].filter((filterItem)=>filterItem === action.payload).length > 0){
                tagLevel1 = "상체";
            }
            if(["하체"].filter((filterItem)=>filterItem === action.payload).length > 0){
                tagLevel1 = "하체";
            }
            if(["복근"].filter((filterItem)=>filterItem === action.payload).length > 0){
                tagLevel1 = "코어";
            }

            state.routineList.unshift({
                id:uuidv4(),
                name: "",
                imgCode: "",
                tagLevel1: tagLevel1,
                tagLevel2: action.payload,
                tagLevel3: "",
            })
            state.targetMuscle.map((item)=>{
                if(item.name === action.payload){
                    item.manageModalView = true;
                }else{
                    item.manageModalView = false;
                }
            })
        },
        //루틴 명 변경
        RoutineNameChange : (state,action)=>{
            state.routineList.find(findItem=>findItem.id === action.payload.id).name = action.payload.name;
        },
        RoutineTagChange : (state, action)=>{

            switch(action.payload.type){
                case "level1":
                    //level1 테그는 정적 테그로 변경되면 안됨
                    //level2 변경시 자동으로 변경됨
                    break;
                case "level2":


                    //level1 테그 자동 적용
                    if(["가슴", "어깨", "팔", "등"].filter((filterItem)=>filterItem === action.payload.tag).length > 0){
                        state.routineList.find(findItem=>findItem.id === action.payload.routine.id).tagLevel1 = "상체";
                    }
                    if(["하체"].filter((filterItem)=>filterItem === action.payload.tag).length > 0){
                        state.routineList.find(findItem=>findItem.id === action.payload.routine.id).tagLevel1 = "하체";
                    }
                    if(["복근"].filter((filterItem)=>filterItem === action.payload.tag).length > 0){
                        state.routineList.find(findItem=>findItem.id === action.payload.routine.id).tagLevel1 = "코어";
                    }

                    state.routineList.find(findItem=>findItem.id === action.payload.routine.id).tagLevel2 = action.payload.tag;
                    break;
                case "level3":
                    state.routineList.find(findItem=>findItem.id === action.payload.routine.id).tagLevel3 = action.payload.tag;
                    break;
            }

            
        },
        deleteRoutine : (state, action)=>{
            state.routineList = state.routineList.filter((filterItem)=>filterItem.id !== action.payload);
        }
    },
});

export const { targetMuscleOpenControl, RoutineListAdd, RoutineNameChange, RoutineTagChange, deleteRoutine } = routineManageSlice.actions;

export default routineManageSlice.reducer;
