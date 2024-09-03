import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";


// 루틴리스트 API 요청
const fetchRoutineList = async() =>{
    return await api.get("/api/v1/health/routine")
}

export const useRoutineListQuery = () =>{
    return useQuery({
        queryKey: ["routine-list-get"],
        queryFn: ()=>fetchRoutineList(),
        select: (data)=>data.data,
        retry: 0
    })
}



// 루틴리스트 추가 API 요청
const fetchRoutineAdd = ({id,name,imgCode,tagLevel1,tagLevel2,tagLevel3})=>{
    return api.post("/api/v1/health/routine/add",{id,name,imgCode,tagLevel1,tagLevel2,tagLevel3})
}

export const useRoutineAddQuery = ({id,name,imgCode,tagLevel1,tagLevel2,tagLevel3})=>{
    return useQuery({
        enabled:false,
        queryKey: ["routine-add"],
        queryFn: ()=>fetchRoutineAdd({id,name,imgCode,tagLevel1,tagLevel2,tagLevel3}),
        select: (data)=>data.data,
        retry: 0
    })
}



// 루틴리스트 수정 API 요청
const fetchRoutinePatch = ({id,name,imgCode,tagLevel1,tagLevel2,tagLevel3})=>{
    return api.patch("/api/v1/health/routine",{id,name,imgCode,tagLevel1,tagLevel2,tagLevel3})
}

export const useRoutinePatch = ({id,name,imgCode,tagLevel1,tagLevel2,tagLevel3})=>{
    return useQuery({
        enabled:false,
        queryKey: ["routine-patch"],
        queryFn: ()=>fetchRoutinePatch({id,name,imgCode,tagLevel1,tagLevel2,tagLevel3}),
        retry: 0
    })
}




// 루틴리스트 삭제 API 요청
const fetchRoutineDelete = async({id})=>{
    return await api.delete("/api/v1/health/routine",{
        data: {
            id : id
        },
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const useRoutineDelete = ({id})=>{
    return useQuery({
        enabled:false,
        queryKey: ["routine-delete"],
        queryFn: ()=>fetchRoutineDelete({id}),
        retry: 0
    })
}




//레코드 루틴 추가 API 요청
const fetchRecordRoutineAppend = (routineList)=>{
    return api.put("/api/v1/health/record",routineList)
}

export const useRecordRoutineAppendQuery = (routineList)=>{
    return useQuery({
        enabled:false,
        queryKey: ["record-append"],
        queryFn: ()=>fetchRecordRoutineAppend(routineList),
        retry: 0
    })
}




//선택 일 별 레코드 루틴 조회 API 요청
const fetchRecordRoutine = (selectedYearMonth)=>{
    
    return api.get("/api/v1/health/record",{
        params:{
            workoutDateMonth:selectedYearMonth
        },
        headers:{
            "Content-Type":"application/json"
        }
    })

}

export const useRecordRoutineListQuery = (selectedYearMonth)=>{
    return useQuery({
        enabled:false,
        queryKey: ["record-list"],
        queryFn: ()=>fetchRecordRoutine(selectedYearMonth),
        retry: 0,
        select:(res)=>res.data
    })
}

// //레코드 All Done 처리
const fetchRecordDoneToggle = ({id,doneFlag})=>{
    return api.post("/api/v1/health/record/done",{id,doneFlag});
}

export const useRecordDoneToggle = ({id,doneFlag})=>{
    return useQuery({
        enabled:false,
        queryKey: ["record-all-done"],
        queryFn: ()=>fetchRecordDoneToggle({id,doneFlag}),
        retry: 0
    })
}


//세트스코어 추가 API 요청
const fetchScoreAppend = (recordId)=>{
    return api.put(`/api/v1/health/record/score?recordId=${recordId}`)
}

export const useScoreAppendQuery = (recordId)=>{
    return useQuery({
        enabled:false,
        queryKey: ["score-append"],
        queryFn: ()=>fetchScoreAppend(recordId),
        retry: 0,
    })
}



//세트스코어 수정 API 요청
const fetchScorePatch = ({workDate, healthRoutineRecordId, setNum, weight, weightUnit, count, countUnit})=>{
    return api.patch("/api/v1/health/record/score",{workDate, healthRoutineRecordId, setNum, weight, weightUnit, count, countUnit})
}

export const useScorePatchQuery = ({workDate, healthRoutineRecordId, setNum, weight, weightUnit, count, countUnit})=>{
    return useQuery({
        enabled: false,
        queryKey:["score-patch"],
        queryFn: ()=>fetchScorePatch({workDate, healthRoutineRecordId, setNum, weight, weightUnit, count, countUnit}),
        retry: 0,
    })
}



//세트스코어 완료 플레그 변경 API 요청
const fetchScoreDoneFlagToggle = ({healthRoutineRecordId,setNum})=>{
    return api.patch("/api/v1/health/record/scoreDoneToggle",{healthRoutineRecordId,setNum})
}

export const useScoreDoneFlagToggleQuery = ({healthRoutineRecordId,setNum})=>{
    return useQuery({
        enabled: false,
        queryKey:["score-Done-flag-toggle"],
        queryFn: ()=>fetchScoreDoneFlagToggle({healthRoutineRecordId,setNum}),
        retry: 0,
    })
}



//세트스코어 삭제 API 요청
const fetchRecordDelete = ({ healthRoutineRecordId, setNum})=>{
    return api.delete("/api/v1/health/record",{
        data: { healthRoutineRecordId, setNum},
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const useRecordDeleteQuery = ({ healthRoutineRecordId, setNum})=>{
    return useQuery({
        enabled: false,
        queryKey:["score-delete"],
        queryFn: ()=>fetchRecordDelete({ healthRoutineRecordId, setNum}),
        retry: 0,
    })
}