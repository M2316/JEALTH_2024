import React, { useEffect, useRef, useState } from "react";
import {
    RoutineModifyContainerStyle,
    RoutineModifyContentStyle,
    RoutineModifyTitleStyle,
    RoutineSearchTagStyle,
    RoutineModalOkButStyle,
    routineCardContainerStyle,
    routineCardTopTapStyle,
} from "./RoutineModifyModalStyle";
import Input from "../../common/components/input/Input";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { BiDownArrow } from "react-icons/bi";
import RoutineModifyItem from "./RoutineModifyItem";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
    RoutineListAdd,
    targetMuscleOpenControl,
} from "../../redux/reducers/routineManageSlice";

import touchVibrateUtil from "../../utils/touchVibrateUtil";
const groupVariants = {
    init: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const RoutineModifyModal = ({ onClose }) => {
    const [searchVal, setSearchVal] = useState("");
    const dispatch = useDispatch();
    const arrowControlRef = useRef([]);

    const [arrowScope, arrowAnimation] = useAnimate();

    //redux에서 데이터 가져오기
    const routineManageList = useSelector(
        (state) => state.routineManage.targetMuscle
    );
    const routineList = useSelector((state) => state.routineManage.routineList);

    //루틴 종목 클릭시 해당 루틴 목록 열기
    const workoutGroupClickHandler = (e, name) => {
        touchVibrateUtil();
        dispatch(targetMuscleOpenControl({name,type:"manage"}));
    };


    //루틴 추가 버튼 클릭시 해당 루틴 목록에 추가
    const routineListAddHandler = (e, name) => {
        touchVibrateUtil([40, 10, 50, 40, 10, 50]);
        dispatch(RoutineListAdd(name));
    };

    //애니메이션 제어 useEffect
    useEffect(() => {
        //루틴 목록이 열렸을때 화살표 회전 애니메이션
        routineManageList.map((item, idx) => {
            if(item.manageModalView) {
                arrowAnimation(arrowControlRef.current[idx], { rotate: 180 });
                arrowControlRef.current[idx].parentElement.parentElement.querySelector('button').scrollIntoView({behavior:'smooth'});
                
            }
        });
    }, [routineManageList]);

    return (
        <AnimatePresence>
            <div css={RoutineModifyContainerStyle} ref={arrowScope}>
                <div css={RoutineModifyTitleStyle}>
                    <Input
                        inputIcon="info"
                        valueType="text"
                        inputChangeHandler={(e) => setSearchVal(e.target.value)}
                        inputClearHandler={() => setSearchVal("")}
                        inputState={searchVal}
                        placeholder="검색어를 입력해 주세요."
                        addStyle={`width:60%; margin:0;`}
                        name="searchVal"
                    ></Input>
                    <ul css={RoutineSearchTagStyle}>
                        <li>#가슴</li>
                        <li>#프리웨이트</li>
                    </ul>
                </div>
                <motion.div
                    css={RoutineModifyContentStyle}
                    variants={groupVariants}
                    initial="init"
                    animate="open"
                    exit="closed"
                >
                    {routineManageList &&
                        routineManageList.map((targetMuscle, idxA) => (
                            <div css={routineCardContainerStyle} key={uuidv4()}>
                                <div css={routineCardTopTapStyle}>
                                    <div
                                        onClick={(e) =>
                                            workoutGroupClickHandler(
                                                e,
                                                targetMuscle.name
                                            )
                                        }
                                    >
                                        <span>{targetMuscle.name}</span>
                                        <motion.span
                                            ref={(el) =>
                                                (arrowControlRef.current[idxA] =
                                                    el)
                                            }
                                        >
                                            <BiDownArrow />
                                        </motion.span>
                                    </div>
                                    <button
                                        onClick={(e) =>
                                            routineListAddHandler(
                                                e,
                                                targetMuscle.name
                                            )
                                        }
                                    >
                                        루틴 추가
                                    </button>
                                </div>
                                <motion.div>
                                    {targetMuscle.manageModalView &&
                                        routineList
                                            .filter(
                                                (routine) =>
                                                    targetMuscle.name ===
                                                    routine.tagLevel2
                                            )
                                            .map((item) => (
                                                <RoutineModifyItem
                                                    data={item}
                                                    key={uuidv4()}
                                                ></RoutineModifyItem>
                                            ))}
                                </motion.div>
                            </div>
                        ))}
                </motion.div>
                <div css={RoutineModalOkButStyle}>
                    <button onClick={() => onClose()}>OK</button>
                </div>
            </div>
        </AnimatePresence>
    );
};

export default RoutineModifyModal;
