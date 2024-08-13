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
    RoutineModifyContentWrapStyle,
    routineGroupSizeStyle,
    cardDeleteImgBoxStyle,
} from "./RoutineModifyModalStyle";
import Input from "../../common/components/input/Input";
import { animate, AnimatePresence, motion, useAnimate } from "framer-motion";
import { BiDownArrow } from "react-icons/bi";
import RoutineModifyItem from "./RoutineModifyItem";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteRoutine,
    RoutineListAdd,
    targetMuscleOpenControl,
} from "../../redux/reducers/routineManageSlice";

import touchVibrateUtil from "../../utils/touchVibrateUtil";
import { IoCloudUploadOutline } from "react-icons/io5";
import { css } from "@emotion/react";
import { RiDeleteBinLine } from "react-icons/ri";

const RoutineModifyModal = ({ onClose }) => {
    //redux state
    const dispatch = useDispatch();
    const routineManageList = useSelector(
        (state) => state.routineManage.targetMuscle
    );
    const routineList = useSelector((state) => state.routineManage.routineList);
    const [filteredRoutineList, setFilteredRoutineList] = useState([]);

    //검색용 state
    const [searchVal, setSearchVal] = useState({
        text: "",
        tagLevel2: "선택",
        tagLevel3: "선택",
    });
    //테그 level별 리스트 가져오기
    const tagLevel2List = useSelector((state) => state.routineManage.tagLevel2);
    const tagLevel3List = useSelector((state) => state.routineManage.tagLevel3);
    //검색에 적용할 tagList state
    const [tagLevel2ListState, setTagLevel2ListState] = useState([
        "선택",
        ...tagLevel2List,
    ]);
    const [tagLevel3ListState, setTagLevel3ListState] = useState([
        "선택",
        ...tagLevel3List,
    ]);
    //검색용 tag ON/Off state
    const [searchTagLevel2Flag, setSearchTagLevel2Flag] = useState(false);
    const [searchTagLevel3Flag, setSearchTagLevel3Flag] = useState(false);

    //루틴 삭제시킬 루틴 ID를 담아두는 state
    const [deleteRoutineId,setdeleteRoutineId] = useState({});

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

    //ok 버튼 이벤트 [모달 close]
    const okBtnHandler = (e) => {
        touchVibrateUtil([50, 50, 50]);
        onClose();
    };

    //검색용 테그 변경 이벤트
    const searchTagChangeHandler = (tagLevel, tagName) => {
        touchVibrateUtil();

        setSearchVal({
            ...searchVal,
            [tagLevel]: tagName,
        });
        if (tagLevel === "tagLevel2") {
            dispatch(
                targetMuscleOpenControl({ name: tagName, type: "manage" })
            );
        }
    };

    //Card 삭제 이벤트
    const cardDragHandler = (e,xOffset,routineId,idxA,idxB)=>{

        if(xOffset > 0){
            //우측 드레그 이벤트 취소 
            return;
        }else if(xOffset > -150){
            //드레그 모션이 부족하면 이벤트 취소
            return;
        }
        
        touchVibrateUtil([200,50,200,50,200]);
        
        animate(cardGroupRef.current[idxA].children[idxB],{x:-500},{duration:0.4}).then(()=>{
            setdeleteRoutineId({id:routineId});
        })

    }

    useEffect(()=>{
        dispatch(deleteRoutine(deleteRoutineId.id));
    },[deleteRoutineId])

    //테그 두개중 한개가 열리면 나머지는 닫히도록 상태관리
    useEffect(() => {
        if (searchTagLevel2Flag) setSearchTagLevel3Flag(false);
    }, [searchTagLevel2Flag]);
    useEffect(() => {
        if (searchTagLevel3Flag) setSearchTagLevel2Flag(false);
    }, [searchTagLevel3Flag]);

    useEffect(() => {
        setFilteredRoutineList(
            routineList.filter(
                (filterItem) =>
                    filterItem.name.includes(searchVal.text) &&
                    (filterItem.tagLevel2 === searchVal.tagLevel2 ||
                        "선택" === searchVal.tagLevel2) &&
                    (filterItem.tagLevel3 === searchVal.tagLevel3 ||
                        "선택" === searchVal.tagLevel3)
            )
        );
    }, [searchVal, routineList]);

    

    //애니메이션 관련 코드 start================================================================================
    const arrowControlRef = useRef([]);
    const [arrowScope, arrowAnimation] = useAnimate();
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
        <div
            css={RoutineModifyContainerStyle}
            ref={arrowScope}
            onClick={(e) => {
                if (e.target.dataset.tagType === "search") return;
                setSearchTagLevel2Flag(false);
                setSearchTagLevel3Flag(false);
            }}
        >
            <div css={RoutineModifyTitleStyle}>
                <Input
                    inputIcon="magnify"
                    valueType="text"
                    inputChangeHandler={(e) =>
                        setSearchVal({ ...searchVal, text: e.target.value })
                    }
                    inputClearHandler={() =>
                        setSearchVal({ ...searchVal, text: "" })
                    }
                    inputState={searchVal.text}
                    placeholder="검색어를 입력해 주세요."
                    addStyle={`width:60%; margin:0; font-size:12px !important;`}
                    name="searchVal-text"
                    onKeyDownHandler={(e) => {
                        if (e.key === "Enter") {
                            e.target.blur();
                        }
                    }}
                ></Input>
                <div css={RoutineSearchTagStyle}>
                    <ul>
                        <li
                            data-tag-type="search"
                            onClick={() =>
                                setSearchTagLevel2Flag(!searchTagLevel2Flag)
                            }
                        >
                            #{searchVal.tagLevel2}
                        </li>
                        <AnimatePresence>
                            {searchTagLevel2Flag &&
                                tagLevel2ListState.map((tag, idx) => {
                                    if (tag === searchVal.tagLevel2) return;
                                    return (
                                        <motion.li
                                            key={tag + idx + "searchTag"}
                                            initial={{
                                                opacity: 0,
                                                transition: { duration: 0.3 },
                                            }}
                                            animate={{
                                                opacity: 1,
                                                transition: { duration: 0.3 },
                                            }}
                                            exit={{
                                                opacity: 0,
                                                transition: { duration: 0.3 },
                                            }}
                                            onClick={(e) =>
                                                searchTagChangeHandler(
                                                    "tagLevel2",
                                                    tag
                                                )
                                            }
                                            css={css`
                                                background-color: #556080 !important;
                                            `}
                                        >
                                            #{tag}
                                        </motion.li>
                                    );
                                })}
                        </AnimatePresence>
                    </ul>
                    <ul>
                        <li
                            data-tag-type="search"
                            onClick={() =>
                                setSearchTagLevel3Flag(!searchTagLevel3Flag)
                            }
                        >
                            #{searchVal.tagLevel3}
                        </li>
                        <AnimatePresence>
                            {searchTagLevel3Flag &&
                                tagLevel3ListState.map((tag, idx) => {
                                    if (tag === searchVal.tagLevel3) return;
                                    return (
                                        <motion.li
                                            key={tag + idx + "searchTag"}
                                            initial={{
                                                opacity: 0,
                                                transition: { duration: 0.3 },
                                            }}
                                            animate={{
                                                opacity: 1,
                                                transition: { duration: 0.3 },
                                            }}
                                            exit={{
                                                opacity: 0,
                                                transition: { duration: 0.3 },
                                            }}
                                            onClick={(e) =>
                                                searchTagChangeHandler(
                                                    "tagLevel3",
                                                    tag
                                                )
                                            }
                                            css={css`
                                                background-color: #556080 !important;
                                            `}
                                        >
                                            #{tag}
                                        </motion.li>
                                    );
                                })}
                        </AnimatePresence>
                    </ul>
                </div>
            </div>
            <div css={RoutineModifyContentWrapStyle}>
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
                                        <span css={routineGroupSizeStyle}>
                                            (
                                            {
                                                filteredRoutineList.filter(
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
                                    ref={(el) =>
                                        (cardGroupRef.current[idxA] = el)
                                    }
                                >
                                    <AnimatePresence>
                                        {targetMuscle.manageModalView &&
                                            filteredRoutineList
                                                .filter(
                                                    (routine) =>
                                                        targetMuscle.name ===
                                                        routine.tagLevel2
                                                )
                                                .map((item, idxB) => (
                                                    <motion.div
                                                        drag="x"
                                                        dragConstraints={{
                                                            left: 0,
                                                            right: 0,
                                                        }}
                                                        onDragEnd={(e,info)=>cardDragHandler(e,info.offset.x,item.id,idxA,idxB)}
                                                        initial={{
                                                            y: -20,
                                                            opacity: 0,
                                                            transition: { duration: 0.3 },
                                                        }}
                                                        animate={{
                                                            y: 0,
                                                            opacity: 1,
                                                            transition: { duration: 0.3 },
                                                        }}
                                                        css={cardWrapStyle}
                                                        key={item.id}
                                                    >
                                                        <RoutineModifyItem
                                                            id={item.id}
                                                            setCardGroupChangeFlag={
                                                                setCardGroupChangeFlag
                                                            }
                                                        ></RoutineModifyItem>
                                                        <div css={cardDeleteImgBoxStyle}>
                                                            <RiDeleteBinLine></RiDeleteBinLine>
                                                            <span>삭제</span>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ))}
                </motion.div>
            </div>
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
