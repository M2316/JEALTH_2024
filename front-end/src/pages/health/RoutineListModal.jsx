import React, { useEffect, useRef, useState } from "react";
import {
    RoutineCardContainerStyle,
    RoutineCardTopTapStyle,
    RoutineGroupStyle,
    RoutineListContainerStyle,
    RoutineListTitleStyle,
    RoutineModalContentStyle,
    RoutineModalOkButStyle,
} from "./RoutineListModalStyle";

import { BiDownArrow } from "react-icons/bi";
import { motion, useAnimate } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { targetMuscleOpenControl } from "../../redux/reducers/routineManageSlice";
import touchVibrateUtil from "../../utils/touchVibrateUtil";
import RoutineListItem from "./RoutineListItem";
import { routineListAppend } from "../../redux/reducers/workoutRecordSlice";

const RoutineListModal = ({ onClose }) => {
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
    const selectedDate = useSelector( (state)=>state.calendar.strDate);

    //루틴 종목 클릭시 해당 루틴 목록 열기
    const workoutGroupClickHandler = (e, name) => {
        touchVibrateUtil();
        dispatch(targetMuscleOpenControl({ name, type: "selector" }));
    };

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
            setSelectedRoutineList([...selectedRoutineList, item]);
        }
    };

    const okBtnHandler = (e)=>{
        dispatch(routineListAppend({
            workoutDate:selectedDate,
            selectedRoutine:selectedRoutineList            
        }));

        onClose();
    }


    //애니메이션 관련 코드 ================================================================================
    const [scope, animate] = useAnimate();
    const arrowControlRef = useRef([]);

    //페이지 실행시 실행
    useEffect(() => {
        const enterAnimation = () => {
            animate(
                scope.current,
                { y: [-20, 0] },
                { duration: 0.3, type: "spring" }
            );
        };
        enterAnimation();

        animate(
            scope.current,
            { y: [-20, 0] },
            { duration: 0.3, type: "spring" }
        );
    }, []);

    //루틴 목록이 열렸을때 화살표 회전 애니메이션
    useEffect(() => {
        targetMuscleList.map((item, idx) => {
            if (item.selectorModalView) {
                animate(arrowControlRef.current[idx], { rotate: 180 });
                arrowControlRef.current[
                    idx
                ].parentElement.parentElement.scrollIntoView({
                    behavior: "smooth",
                });
            }else{
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
            <div css={RoutineModalContentStyle}>
                {targetMuscleList &&
                    targetMuscleList.map((targetMuscle, idxA) => (
                        <div key={targetMuscle.name+idxA} css={RoutineGroupStyle}>
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
                                    <motion.span
                                        ref={(el) =>
                                            (arrowControlRef.current[idxA] = el)
                                        }
                                    >
                                        <BiDownArrow />
                                    </motion.span>
                                </div>
                            </div>
                            <div
                                css={RoutineCardContainerStyle}
                                key="routine-card-component"
                            >
                                {targetMuscle.selectorModalView &&
                                    routineManageList
                                        .filter(
                                            (routine) =>
                                                targetMuscle.name ===
                                                routine.tagLevel2
                                        )
                                        .map((item,idxB) => (
                                            <RoutineListItem
                                                data={item}
                                                key={item.name+idxB}
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
                            </div>
                        </div>
                    ))}
            </div>
            <div css={RoutineModalOkButStyle}>
                <button onClick={(e) => okBtnHandler(e)}>OK</button>
            </div>
        </div>
    );
};
export default RoutineListModal;
