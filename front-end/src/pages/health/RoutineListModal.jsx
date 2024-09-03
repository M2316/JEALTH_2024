import React, { useEffect, useRef, useState } from "react";
import {
    RoutineCardContainerStyle,
    RoutineCardTopTapStyle,
    routineGroupSizeStyle,
    RoutineGroupStyle,
    RoutineListContainerStyle,
    RoutineListTitleStyle,
    RoutineModalContentStyle,
    RoutineModalContentWrapStyle,
    RoutineModalOkButStyle,
} from "./RoutineListModalStyle";

import { BiDownArrow } from "react-icons/bi";
import {
    AnimatePresence,
    motion,
    useAnimate,
    usePresence,
} from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { TargetMuscleOpenControl } from "../../redux/reducers/health/routineManageSlice";
import touchVibrateUtil from "../../utils/touchVibrateUtil";
import RoutineListItem from "./RoutineListItem";
import { routineListAppend } from "../../redux/reducers/health/workoutRecordSlice";
import { duration } from "@mui/material";
import { useRecordRoutineAppendQuery, useRecordRoutineListQuery } from "../../hooks/useRoutineListHook";

const RoutineListModal = ({ onClose, isOpen }) => {
    // 컴포넌트 기본 state
    const [selectedRoutineList, setSelectedRoutineList] = useState([]);

    //redux to State AND dispatch
    const dispatch = useDispatch();
    const routineManageList = useSelector(
        (state) => state.routineManage.routineList
    );
    const targetMuscleList = useSelector(
        (state) => state.routineManage.targetMuscle
    );
    const selectedDate = useSelector((state) => state.calendar.strDate);
    

    //선택된 날짜의 레코드 조회 react-query
    const [selectedYearMonth,setSelectedYearMonth] = useState();
    useEffect(()=>{
        if(!selectedDate)return
        
        setSelectedYearMonth(`${selectedDate.split('-')[0]}-${selectedDate.split('-')[1]}`)
    },[selectedDate])
    const {data:recordRoutineListData,refetch:recordRoutineListRefetch,isLoading:recordRoutineListIsLoading} = useRecordRoutineListQuery(selectedYearMonth);
    

    //레코드 루틴 추가 react-query
    const { refetch:routineAppendRefetch } =
        useRecordRoutineAppendQuery(selectedRoutineList);

    //루틴 종목 클릭시 해당 루틴 목록 열기
    const workoutGroupClickHandler = (e, name) => {
        touchVibrateUtil();
        dispatch(TargetMuscleOpenControl({ name, type: "selector" }));
    };

    //routine 선택 이벤트 핸들러
    const cardClickHandler = (item) => {
        //이미 선택되어 있는 routine이면 삭제
        const duplicatedRoutine = selectedRoutineList.find(
            (findItem) => findItem.id === item.id
        );
        if (duplicatedRoutine) {
            setSelectedRoutineList(
                selectedRoutineList.filter(
                    (findItem) => findItem.id !== item.id
                )
            );
        } else {
            setSelectedRoutineList([
                ...selectedRoutineList,
                { 
                    ...item, 
                    workoutDate: selectedDate,
                    scoreList: [
                        {
                            setNum: 1,
                            weight: 0,
                            weightUnit: "Kg",
                            count: 0,
                            countUnit: "회",
                            setDoneFlag: false,
                        },
                    ],
                },
            ]);
        }
    };

    //루틴 적용 OK버튼 핸들러
    const okBtnHandler = (e) => {
        if (selectedRoutineList.length > 0) {
            touchVibrateUtil([100, 50, 100, 50, 200]);

            routineAppendRefetch().then(() => {
                recordRoutineListRefetch().then(()=>{
                    dispatch(routineRecordListInit(recordRoutineListData));
                })

            });
        } else {
            touchVibrateUtil([50, 50, 50]);
        }
        onClose();
    };

    //애니메이션 관련 코드 ================================================================================
    const [scope, animate] = useAnimate();
    const [isPresent, safeToRemove] = usePresence();
    const arrowControlRef = useRef([]);
    const cardGroupRef = useRef([]);

    //루틴 목록이 열렸을때 화살표 회전 애니메이션
    useEffect(() => {
        targetMuscleList.map((item, idx) => {
            if (item.selectorModalView) {
                animate(arrowControlRef.current[idx], { rotate: 180 });
                arrowControlRef.current[
                    idx
                ].parentElement.parentElement.scrollIntoView({
                    behavior: "smooth",
                    block: 'start'
                });
                animate(
                    cardGroupRef.current[idx],
                    { y: [-20, 0], opacity: [0, 1] },
                    { transition: { duration: 0.3 } }
                );
                // const cardGroupOpenAnimation = async () => {
                //     await
                // };
                // cardGroupOpenAnimation();
            } else {
                animate(arrowControlRef.current[idx], { rotate: 0 });
            }
        });
    }, [targetMuscleList]);

    //애니메이션 관련 코드 ================================================================================

    return (
        <div css={RoutineListContainerStyle} ref={scope}>
            <div css={RoutineListTitleStyle}>
                <h1>종목 선택</h1>
            </div>

            <div css={RoutineModalContentWrapStyle}>
                <div css={RoutineModalContentStyle}>
                    {targetMuscleList &&
                        targetMuscleList.map((targetMuscle, idxA) => (
                            <div
                                key={targetMuscle.name + idxA}
                                css={RoutineGroupStyle}
                            >
                                <div
                                    css={RoutineCardTopTapStyle}
                                    onClick={(e) =>
                                        workoutGroupClickHandler(
                                            e,
                                            targetMuscle.name
                                        )
                                    }
                                >
                                    <div>
                                        <span>{targetMuscle.name}</span>
                                        <span css={routineGroupSizeStyle}>
                                            (
                                            {
                                                routineManageList.filter(
                                                    (routine) =>
                                                        targetMuscle.name ===
                                                        routine.tagLevel2
                                                ).length
                                            }
                                            )
                                        </span>
                                        <motion.span
                                            ref={(el) =>
                                                (arrowControlRef.current[idxA] =
                                                    el)
                                            }
                                        >
                                            <BiDownArrow />
                                        </motion.span>
                                    </div>
                                </div>

                                <div
                                    css={RoutineCardContainerStyle}
                                    key="routine-card-component"
                                    ref={(el) =>
                                        (cardGroupRef.current[idxA] = el)
                                    }
                                >
                                    <AnimatePresence>
                                        {targetMuscle.selectorModalView &&
                                            routineManageList
                                                .filter(
                                                    (routine) =>
                                                        targetMuscle.name ===
                                                        routine.tagLevel2
                                                )
                                                .map((item, idxB) => (
                                                    <RoutineListItem
                                                        data={item}
                                                        key={item.name + idxB}
                                                        cardClickHandler={
                                                            cardClickHandler
                                                        }
                                                        selectedFlag={
                                                            !!selectedRoutineList.find(
                                                                (findItem) =>
                                                                    findItem.id ===
                                                                    item.id
                                                            )
                                                        }
                                                    ></RoutineListItem>
                                                ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div css={RoutineModalOkButStyle}>
                <motion.button
                    onClick={(e) => okBtnHandler(e)}
                    whileTap={{ scale: 1.2 }}
                >
                    OK
                </motion.button>
            </div>
        </div>
    );
};
export default RoutineListModal;
