import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    targetMuscle: [
        { name: "가슴", manageModalView: false, selectorModalView: false },
        { name: "어깨", manageModalView: false, selectorModalView: false },
        { name: "팔", manageModalView: false, selectorModalView: false },
        { name: "등", manageModalView: false, selectorModalView: false },
        { name: "복근", manageModalView: false, selectorModalView: false },
        { name: "하체", manageModalView: false, selectorModalView: false },
    ],
    tagLevel1: ["상체", "하체", "코어"],
    tagLevel2: ["가슴", "어깨", "팔", "등", "복근", "하체"],
    tagLevel3: ["프리웨이트", "머신웨이트", "맨몸웨이트"],
    routineList: [
        {
            name: "벤치프레스",
            imgCode: "",
            tagLevel1: "상체",
            tagLevel2: "가슴",
            tagLevel3: "프리웨이트",
        },
        {
            name: "덤벨 벤치프레스",
            imgCode: "",
            tagLevel1: "상체",
            tagLevel2: "가슴",
            tagLevel3: "프리웨이트",
        },
        {
            name: "체스트 프레스",
            imgCode: "",
            tagLevel1: "상체",
            tagLevel2: "가슴",
            tagLevel3: "머신웨이트",
        },
        {
            name: "스쿼트",
            imgCode: "",
            tagLevel1: "하체",
            tagLevel2: "하체",
            tagLevel3: "프리웨이트",
        },
        {
            name: "레그익스텐션",
            imgCode: "",
            tagLevel1: "하체",
            tagLevel2: "하체",
            tagLevel3: "머신웨이트",
        },
        {
            name: "레그컬",
            imgCode: "",
            tagLevel1: "하체",
            tagLevel2: "하체",
            tagLevel3: "머신웨이트",
        },
        {
            name: "행잉 레그 레이즈",
            imgCode: "",
            tagLevel1: "코어",
            tagLevel2: "복근",
            tagLevel3: "프리웨이트",
        },
        {
            name: "케이블 크런치",
            imgCode: "",
            tagLevel1: "코어",
            tagLevel2: "복근",
            tagLevel3: "머신웨이트",
        },
        {
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
        targetMuscleOpenControl: (state, action) => { //루틴 종목 리스트 열기
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
        RoutineListAdd : (state, action) => { //신규 루틴 종목 추가
            state.routineList.unshift({
                name: "",
                imgCode: "",
                tagLevel1: "",
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

        }
    },
});

export const { targetMuscleOpenControl, RoutineListAdd } = routineManageSlice.actions;

export default routineManageSlice.reducer;
