import React, { useEffect, useRef, useState } from "react";
import {
    RoutineModifyContainerStyle,
    RoutineModifyContentStyle,
    RoutineModifyTitleStyle,
    RoutineSearchTagStyle,
    RoutineModalOkButStyle,
    routineCardContainerStyle,
    routineCardTopTapStyle,
    cardWrapStyle,
    alertDialogStyle,
    alertDialogBoxStyle,
} from "./RoutineModifyModalStyle";
import Input from "../../common/components/input/Input";
import { animate, AnimatePresence, motion, useAnimate } from "framer-motion";
import { BiDownArrow } from "react-icons/bi";
import RoutineModifyItem from "./RoutineModifyItem";
import { useDispatch, useSelector } from "react-redux";
import {
    RoutineListAdd,
    targetMuscleOpenControl,
} from "../../redux/reducers/routineManageSlice";

import touchVibrateUtil from "../../utils/touchVibrateUtil";
import { IoCloudUploadOutline } from "react-icons/io5";

const RoutineModifyModal = ({ onClose }) => {
    const [searchVal, setSearchVal] = useState("");
    const dispatch = useDispatch();
    const arrowControlRef = useRef([]);

    const [arrowScope, arrowAnimation] = useAnimate();

    const [searchTagV2Flag, setSearchTagV2Flag] = useState(false);
    const [searchTagV3Flag, setSearchTagV3Flag] = useState(false);

    const TagLevel2 = ["선택",...useSelector((state) => state.routineManage.tagLevel2)];
    const TagLevel3 = ["선택",...useSelector((state) => state.routineManage.tagLevel3)];

    //컴포넌트 초기 값 설정
    useEffect(()=>{
        

    },[])

    //redux에서 데이터 가져오기
    const routineManageList = useSelector(
        (state) => state.routineManage.targetMuscle
    );
    const routineList = useSelector((state) => state.routineManage.routineList);
    const [filteredRoutineList, setFilteredRoutineList] = useState([]);

    //루틴 종목 클릭시 해당 루틴 목록 열기
    const workoutGroupClickHandler = (e, name) => {
        touchVibrateUtil();
        dispatch(targetMuscleOpenControl({ name, type: "manage" }));
    };

    //루틴 추가 버튼 클릭시 해당 루틴 목록에 추가
    const routineListAddHandler = (e, name) => {
        touchVibrateUtil([40, 10, 50, 40, 10, 50]);
        dispatch(RoutineListAdd(name));
    };

    //ok 버튼 이벤트
    const okBtnHandler = (e) => {
        touchVibrateUtil([50, 50, 50]);
        onClose();
    };

    //검색 태그 선택 이벤트
    const searchTagChangeHandler = (tagName,tagLevel) => {
        if(tagName === '선택'){
            if(tagLevel === 'level2'){
                setSearchTagV2Flag(!searchTagV2Flag)
            }
            if(tagLevel === 'level3'){
                setSearchTagV3Flag(!searchTagV3Flag)
            }
        }else{
            console.log("테그선택~")
        }


    };

    useEffect(() => {
        setFilteredRoutineList(
            routineList.filter((filterItem) =>
                filterItem.name.includes(searchVal)
            )
        );
    }, [searchVal, routineList]);

    //애니메이션 관련 코드 start================================================================================
    const cardGroupRef = useRef([]);
    const [cardGroupChangeFlag, setCardGroupChangeFlag] = useState(false);
    const cardGroupChangeTimeoutRef = useRef();
    const alertRef = useRef();

    useEffect(() => {
        //루틴 목록이 열렸을때 화살표 회전 애니메이션
        routineManageList.map((item, idx) => {
            if (item.manageModalView) {
                arrowAnimation(arrowControlRef.current[idx], { rotate: 180 });
                arrowControlRef.current[idx].parentElement.parentElement
                    .querySelector("button")
                    .scrollIntoView({ behavior: "smooth" });
                animate(
                    cardGroupRef.current[idx],
                    { y: [-20, 0], opacity: [0, 1] },
                    { transition: { duration: 0.3 } }
                );
            } else {
                arrowAnimation(arrowControlRef.current[idx], { rotate: 0 });
            }
        });
    }, [routineManageList]);

    useEffect(() => {
        if (cardGroupChangeFlag) {
            clearTimeout(cardGroupChangeTimeoutRef.current);
            cardGroupChangeTimeoutRef.current = setTimeout(() => {
                alertRef.current &&
                    animate(alertRef.current, {
                        opacity: 0,
                        scale: 0.8,
                        y: 0,
                    }).then(() => {
                        setCardGroupChangeFlag(false);
                    });
            }, 1000);
        }
    }, [cardGroupChangeFlag]);

    //애니메이션 관련 코드 end==================================================================================

    return (
        <div css={RoutineModifyContainerStyle} ref={arrowScope}>
            <div css={RoutineModifyTitleStyle}>
                <Input
                    inputIcon="magnify"
                    valueType="text"
                    inputChangeHandler={(e) => setSearchVal(e.target.value)}
                    inputClearHandler={() => setSearchVal("")}
                    inputState={searchVal}
                    placeholder="검색어를 입력해 주세요."
                    addStyle={`width:60%; margin:0; font-size:12px !important;`}
                    name="searchVal"
                ></Input>
                <ul css={RoutineSearchTagStyle}>
                    <div>
                        {searchTagV2Flag ? (
                            TagLevel2.map((tagName, idx) => (
                                <li
                                    key={"searchTag"+idx}
                                    onClick={()=>searchTagChangeHandler(tagName,"level2")}
                                >
                                    #{tagName}
                                </li>
                            ))
                        ) : (
                            <li
                                onClick={() => {
                                    setSearchTagV2Flag(!searchTagV2Flag);
                                    setSearchTagV3Flag(false);
                                }}
                            >
                                #선택
                            </li>
                        )}
                    </div>
                    <div>
                        {searchTagV3Flag ? (
                            TagLevel3.map((tagName, idx) => (
                                <li
                                    key={"searchTag" + tagName + idx}
                                    onClick={()=>searchTagChangeHandler(tagName,"level3")}
                                >
                                    #{tagName}
                                </li>
                            ))
                        ) : (
                            <li
                                onClick={() => {
                                    setSearchTagV3Flag(!searchTagV3Flag);
                                    setSearchTagV2Flag(false);
                                }}
                            >
                                #선택
                            </li>
                        )}
                    </div>
                </ul>
            </div>
            <motion.div css={RoutineModifyContentStyle}>
                {routineManageList &&
                    routineManageList.map((targetMuscle, idxA) => (
                        <div
                            css={routineCardContainerStyle}
                            key={targetMuscle + idxA}
                        >
                            <div css={routineCardTopTapStyle}>
                                {targetMuscle.manageModalView && (
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
                                )}
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
                                            (arrowControlRef.current[idxA] = el)
                                        }
                                    >
                                        <BiDownArrow />
                                    </motion.span>
                                </div>
                            </div>
                            <div
                                ref={(el) => (cardGroupRef.current[idxA] = el)}
                            >
                                <AnimatePresence>
                                    {targetMuscle.manageModalView &&
                                        filteredRoutineList
                                            .filter(
                                                (routine) =>
                                                    targetMuscle.name ===
                                                    routine.tagLevel2
                                            )
                                            .map((item, idx) => (
                                                <div
                                                    css={cardWrapStyle}
                                                    key={item.id}
                                                >
                                                    <RoutineModifyItem
                                                        id={item.id}
                                                        setCardGroupChangeFlag={
                                                            setCardGroupChangeFlag
                                                        }
                                                    ></RoutineModifyItem>
                                                </div>
                                            ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
            </motion.div>
            <div css={RoutineModalOkButStyle}>
                <motion.button
                    onClick={(e) => okBtnHandler(e)}
                    whileTap={{ scale: 1.2 }}
                >
                    OK
                </motion.button>
            </div>
            {cardGroupChangeFlag && (
                <div css={alertDialogBoxStyle}>
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 0 }}
                            animate={{ opacity: 1, scale: 1, y: 10 }}
                            transition={{ duration: 0.5 }}
                            css={alertDialogStyle}
                            ref={alertRef}
                            key={"routine-modify-modal-alert"}
                        >
                            <IoCloudUploadOutline />
                            <span>그룹 이동</span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default RoutineModifyModal;
