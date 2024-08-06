import React, { useEffect, useRef } from "react";
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
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { targetMuscleOpenControl } from "../../redux/reducers/routineManageSlice";
import touchVibrateUtil from "../../utils/touchVibrateUtil";
import { v4 as uuidv4 } from "uuid";
import RoutineListItem from "./RoutineListItem";

const groupVariants = {
    init: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const RoutineListModal = ({ onClose }) => {
    //reduc dispatch
    const dispatch = useDispatch();

    //redux에서 데이터 가져오기
    const routineList = useSelector((state) => state.routineManage.routineList);
    const routineManageList = useSelector(
        (state) => state.routineManage.targetMuscle
    );

    const arrowControlRef = useRef([]);

    const [arrowScope, arrowAnimation] = useAnimate();

    //루틴 종목 클릭시 해당 루틴 목록 열기
    const workoutGroupClickHandler = (e, name) => {
        touchVibrateUtil();
        dispatch(targetMuscleOpenControl({ name, type: "selector" }));
    };

    //애니메이션 제어 useEffect
    useEffect(() => {
        //루틴 목록이 열렸을때 화살표 회전 애니메이션
        routineManageList.map((item, idx) => {
            if (item.selectorModalView) {
                arrowAnimation(arrowControlRef.current[idx], { rotate: 180 });
                arrowControlRef.current[
                    idx
                ].parentElement.parentElement.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    }, [routineManageList]);

    return (
        <AnimatePresence>
            <div css={RoutineListContainerStyle} ref={arrowScope}>
                <div css={RoutineListTitleStyle}>
                    <h1>종목 선택</h1>
                </div>
                <motion.div
                    variants={groupVariants}
                    initial="init"
                    animate="open"
                    exit="closed"
                    css={RoutineModalContentStyle}
                >
                    {routineManageList &&
                        routineManageList.map((targetMuscle, idxA) => (
                            <div key={uuidv4()} css={RoutineGroupStyle}>
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
                                                (arrowControlRef.current[idxA] =
                                                    el)
                                            }
                                        >
                                            <BiDownArrow />
                                        </motion.span>
                                    </div>
                                </div>

                                <motion.div css={RoutineCardContainerStyle}>
                                    {targetMuscle.selectorModalView &&
                                        routineList
                                            .filter(
                                                (routine) =>
                                                    targetMuscle.name ===
                                                    routine.tagLevel2
                                            )
                                            .map((item) => (
                                                <RoutineListItem
                                                    data={item}
                                                    key={uuidv4()}
                                                ></RoutineListItem>
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
export default RoutineListModal;
