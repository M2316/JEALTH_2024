import React, { useEffect, useRef, useState } from "react";
import ScrollPicker from "../../common/components/scrollPicker/ScrollPicker";
import AppFooter from "../../common/components/appFooter/AppFooter";
import {
    checkBoxStyle,
    EmptyCardTitleBoxStyle,
    healthCardContentStyle,
    healthCardIconStyle,
    healthCardTitleBoxStyle,
    healthCardTitleStyle,
    healthPageBodyStyle,
    modalContentStyle,
    numberPickerStyle,
    routineAllDoenBtnStyle,
    routineAllUnfinishedBtnStyle,
    subTitleStyle,
    titleStyle,
    workoutSetBoxStyle,
    workoutSetInfoStyle,
} from "./HealthPageStyle";
import healthIcon from "@img/sports/health-white.png";
import deleteIcon from "@img/record-delete.png";
import uncheckIcon from "@img/record-uncheck.png";
import clearIcon from "@img/record-clear.png";
import circleCheckIcon from "@img/circle-check-icon.png";
import negativeCircleCheckIcon from "@img/negative-circle-check-icon.png";
import setAddIcon from "@img/set-add-btn-icon.png";
import Navbar from "../../common/components/navbar/Navbar";
import HealthCard from "./components/HealthCard";
import { Box, duration, Modal } from "@mui/material";
import Calendar from "./components/Calendar";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
    recordAllDoneFlagChange,
    recordDelete,
    recordDoneChange,
    routineRecordAppend,
    routineRecordListInit,
    routineRecordUpdate,
} from "../../redux/reducers/health/workoutRecordSlice";
import touchVibrateUtil from "../../utils/touchVibrateUtil";
import { css } from "@emotion/react";
import { RoutineListInit } from "../../redux/reducers/health/routineManageSlice";
import {
    useRecordDeleteQuery,
    useRecordDoneToggle,
    useRecordRoutineListQuery,
    useRoutineListQuery,
    useScoreAppendQuery,
    useScoreDoneFlagToggleQuery,
    useScorePatchQuery,
} from "../../hooks/useRoutineListHook";
import LoadingPage from "../../common/components/loadingPage/LoadingPage";

const HealthPage = () => {
    const [footerViewFlag, setFooterViewFlag] = useState(false);
    const toggleFooterViewHandler = () => {
        setFooterViewFlag(!footerViewFlag);
    };

    const [routineRecordValue, setRoutineRecordValue] = useState({});
    const [numberPickerOpen, setNumberPickerOpen] = useState(false);

    const [selectedRecord, setSelectedRecord] = useState({});

    //redex state 코드
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.calendar); // 캘린더 선택한 날짜
    const [selectedYearMonth, setSelectedYearMonth] = useState();
    // 선택 일의 루틴
    const thisDayRoutine = useSelector((state) =>
        state.workoutRecord.workoutInfo.filter(
            (filterItem) => filterItem.workoutDate === selectedDate.strDate
        )
    );

    //routine List 가져오는 Request-Query [페이지 로딩시 자동 요청됨]
    const {
        data: routineData,
        isFetching: routineIsFetching,
        refetch: routineRefetch,
    } = useRoutineListQuery();

    //선택된 날짜의 레코드 조회 react-query
    const { data, refetch, isLoading } =
        useRecordRoutineListQuery(selectedYearMonth);

    //세트추가 react-query
    const [selectedRoutineId, setSelectedRoutineId] = useState();
    const { refetch: scoreAppendRefetch } =
        useScoreAppendQuery(selectedRoutineId);
    useEffect(() => {
        if (!selectedRoutineId) return;
        scoreAppendRefetch();
        setSelectedRoutineId(null);
    }, [selectedRoutineId]);

    //세트수정 react-query
    const [modifyScore, setModifyScore] = useState({});
    const { refetch: scorePatchRefetch } = useScorePatchQuery(modifyScore);
    useEffect(() => {
        if (!modifyScore.healthRoutineRecordId) return;
        scorePatchRefetch().then(() => {
            dispatch(routineRecordUpdate(modifyScore));
        });
    }, [modifyScore]);

    //세트 Done Flag Toggle처리 react-query
    const [scoreDoneToggle, setScoreDoneToggle] = useState({});
    const { refetch: scoreDoneFlagRefetch } =
        useScoreDoneFlagToggleQuery(scoreDoneToggle);
    useEffect(() => {
        if (!scoreDoneToggle.healthRoutineRecordId) return;
        scoreDoneFlagRefetch();
    }, [scoreDoneToggle]);

    //세트 삭제 처리 react-query
    const [recordDeleteState, setRecordDeleteState] = useState({});
    const { refetch: recordDeleteRefetch } =
        useRecordDeleteQuery(recordDeleteState);

    //레코드 All Done 처리 react-query
    const [routineAllDoneId, setRoutineAllDoneId] = useState({});
    const {refetch: routineAllDoneRefetch} = useRecordDoneToggle({...routineAllDoneId});
    useEffect(()=>{
        if(!routineAllDoneId.id) return;
        routineAllDoneRefetch();
    },[routineAllDoneId]);


    useEffect(() => {
        if (!recordDeleteState.healthRoutineRecordId) return;
        recordDeleteRefetch();
    }, [recordDeleteState]);

    //react-query에서 사용하기위해 selectedYearMonth 값 등록
    useEffect(() => {
        if (selectedDate.strDate === null) return;
        setSelectedYearMonth(`${selectedDate.year}-${selectedDate.month}`);
    }, [selectedDate]);

    //selectedYearMonth 변화가 있으면 해당 월의 record 가져옴
    useEffect(() => {
        if (!selectedYearMonth) return;

        refetch();
    }, [selectedYearMonth]);

    //react-query 통신 이후 data를 redux에 set
    useEffect(() => {
        if (!data) return;
        dispatch(routineRecordListInit(data));
    }, [data]);

    

    //루틴 레코드 AllDone 처리 핸들러
    const routineRecordAllDoneHandler = (routine)=>{
        setRoutineAllDoneId({id:routine.id,doneFlag:true});
        dispatch(recordAllDoneFlagChange({id:routine.id,doneFlag:true}));
        touchVibrateUtil();
    }


    //투린 레코드 Done Flag를 false로 변경
    const routineRecordAllUnfinishedHandler = (routine)=>{
        setRoutineAllDoneId({id:routine.id,doneFlag:false});
        dispatch(recordAllDoneFlagChange({id:routine.id,doneFlag:false}));
        touchVibrateUtil();
    }



    const numberPickerHandler = (e, routineId, recordSetNum) => {
        setSelectedRecord({
            routineId,
            recordSetNum,
        });

        const selectedSetInfo = thisDayRoutine
            .find((findItem) => findItem.id === routineId)
            .scoreList.find((findItem) => findItem.setNum === recordSetNum);
        setRoutineRecordValue(selectedSetInfo);
        setNumberPickerOpen(true);
    };

    //record 적용
    const pickerOkHandler = () => {
        setNumberPickerOpen(false);
        setModifyScore({
            workDate: selectedDate.strDate,
            healthRoutineRecordId: selectedRecord.routineId,
            setNum: selectedRecord.recordSetNum,
            weight: routineRecordValue.weight,
            weightUnit: routineRecordValue.weightUnit,
            count: routineRecordValue.count,
            countUnit: routineRecordValue.countUnit,
        });
    };

    const recordChangeHandler = ({ weight, weightUnit, count, countUnit }) => {
        if (weight) {
            setRoutineRecordValue({
                ...routineRecordValue,
                weight,
                weightUnit,
            });
        } else if (count) {
            setRoutineRecordValue({
                ...routineRecordValue,
                count,
                countUnit,
            });
        }
    };

    //set score 추가버튼 클릭 이벤트
    const recordSetAppendHandler = (e, routineId) => {
        touchVibrateUtil([100, 50, 100, 50, 100]);
        setSelectedRoutineId(routineId);

        dispatch(
            routineRecordAppend({
                id: routineId,
                workDate: selectedDate.strDate,
            })
        );
        e.target.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const recordDragEndHandler = (
        dragX,
        healthRoutineRecordId,
        setNum,
        setDoneFlag,
        e
    ) => {
        if (dragX > 0) {
            if (Math.abs(dragX) < 100) return; //드레그 위치 부족하면 return;
            touchVibrateUtil();

            let modifyScore = thisDayRoutine
                .find((findItem) => findItem.id === healthRoutineRecordId)
                .scoreList.find((findItem) => findItem.setNum === setNum);

            setScoreDoneToggle({
                healthRoutineRecordId: modifyScore.healthRoutineRecordId,
                setNum: modifyScore.setNum,
            });

            dispatch(
                recordDoneChange({
                    routineId: modifyScore.healthRoutineRecordId,
                    recordSetNum: modifyScore.setNum,
                    flag: !setDoneFlag,
                })
            );
        } else {
            if (Math.abs(dragX) < 150) return; //드레그 위치 부족하면 return;

            touchVibrateUtil([100, 50, 100, 50, 100]);
            setRecordDeleteState({ healthRoutineRecordId, setNum });

            dispatch(recordDelete({ healthRoutineRecordId, setNum }));
        }
    };

    //애니메이션 관련 코드 start==============================================================================
    const [scope, animate] = useAnimate();

    //애니메이션 관련 코드 end================================================================================

    const bodyClickHandler = (e) => {
        if (!!e.target.src && e.target.src.includes("/plus-icon.png")) return;
        setFooterViewFlag(false);
    };
    return (
        <div css={healthPageBodyStyle} onClick={bodyClickHandler}>
            {isLoading && <LoadingPage></LoadingPage>}
            <Navbar logo={healthIcon}></Navbar>

            <Calendar></Calendar>
            {thisDayRoutine.length !== 0 ? (
                thisDayRoutine.map((routine, idx) => (
                    <AnimatePresence mode="wait" key={routine.id + idx}>
                        <motion.div
                            css={css`
                                width: 100%;
                                justify-content: center;
                                display: flex;
                            `}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <HealthCard
                                addStyle={`width:90%;display:flex;flex-direction:column;justify-content:start;`}
                            >
                                <div css={healthCardTitleStyle}>
                                    <div css={healthCardIconStyle}>
                                        <img src={healthIcon} />
                                    </div>
                                    <div css={healthCardTitleBoxStyle}>
                                        <h3 css={titleStyle}>{routine.name}</h3>
                                        <div css={subTitleStyle}>
                                            <span>#{routine.tagLevel2}</span>
                                            <span>#{routine.tagLevel3}</span>
                                            {routine.scoreList.find(
                                                (item) => !item.setDoneFlag
                                            ) ? (
                                                <button
                                                    onClick={()=>routineRecordAllDoneHandler(routine)}
                                                    css={routineAllDoenBtnStyle}
                                                >
                                                    All Done
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={()=>routineRecordAllUnfinishedHandler(routine)}
                                                    css={
                                                        routineAllUnfinishedBtnStyle
                                                    }
                                                >
                                                    Done
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <ul css={healthCardContentStyle}>
                                    {routine.scoreList &&
                                        routine.scoreList.map(
                                            (record, idxB) => (
                                                <AnimatePresence
                                                    mode="wait"
                                                    key={
                                                        routine.id + idx + idxB
                                                    }
                                                >
                                                    <motion.li
                                                        initial={{ x: 0, y: 0 }}
                                                        exit={{
                                                            y: 20,
                                                            transition: {
                                                                duration: 0,
                                                            },
                                                        }}
                                                        key={
                                                            routine.id +
                                                            idx +
                                                            idxB +
                                                            "litag"
                                                        }
                                                    >
                                                        <motion.div
                                                            key={
                                                                routine.id +
                                                                record.setNum +
                                                                record.setDoneFlag
                                                            }
                                                            initial={{
                                                                y: -10,
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                y: 0,
                                                                opacity: 1,
                                                            }}
                                                            drag="x"
                                                            dragConstraints={{
                                                                left: 0,
                                                                right: 0,
                                                            }}
                                                            dragElastic={1}
                                                            css={
                                                                workoutSetBoxStyle
                                                            }
                                                            onDragEnd={(
                                                                e,
                                                                drag
                                                            ) => {
                                                                recordDragEndHandler(
                                                                    drag.offset
                                                                        .x,
                                                                    routine.id,
                                                                    record.setNum,
                                                                    record.setDoneFlag,
                                                                    e
                                                                );
                                                            }}
                                                        >
                                                            {!record.setDoneFlag ? (
                                                                <img
                                                                    src={
                                                                        clearIcon
                                                                    }
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={
                                                                        uncheckIcon
                                                                    }
                                                                />
                                                            )}
                                                            <div
                                                                css={
                                                                    workoutSetInfoStyle
                                                                }
                                                                onClick={(e) =>
                                                                    numberPickerHandler(
                                                                        e,
                                                                        routine.id,
                                                                        record.setNum
                                                                    )
                                                                }
                                                            >
                                                                <div>
                                                                    {
                                                                        record.setNum
                                                                    }
                                                                    .
                                                                </div>
                                                                <div>
                                                                    {
                                                                        record.weight
                                                                    }
                                                                    {
                                                                        record.weightUnit
                                                                    }
                                                                </div>
                                                                <div>
                                                                    {
                                                                        record.count
                                                                    }
                                                                    {
                                                                        record.countUnit
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div
                                                                css={
                                                                    checkBoxStyle
                                                                }
                                                            >
                                                                {record.setDoneFlag ? (
                                                                    <img
                                                                        src={
                                                                            circleCheckIcon
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src={
                                                                            negativeCircleCheckIcon
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                            <img
                                                                src={deleteIcon}
                                                            />
                                                        </motion.div>
                                                    </motion.li>
                                                </AnimatePresence>
                                            )
                                        )}

                                    <img
                                        src={setAddIcon}
                                        onClick={(e) =>
                                            recordSetAppendHandler(
                                                e,
                                                routine.id
                                            )
                                        }
                                    />
                                </ul>
                            </HealthCard>
                        </motion.div>
                    </AnimatePresence>
                ))
            ) : (
                <motion.div
                    css={css`
                        width: 100%;
                        justify-content: center;
                        display: flex;
                    `}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <HealthCard
                        addStyle={`width:90%;display:flex;flex-direction:column;justify-content:start;`}
                    >
                        <div css={healthCardTitleStyle}>
                            <div css={healthCardIconStyle}>
                                <img src={healthIcon} />
                            </div>
                            <div css={EmptyCardTitleBoxStyle}>
                                <span css={titleStyle}>
                                    Routine list is empty.
                                </span>
                            </div>
                        </div>
                    </HealthCard>
                </motion.div>
            )}

            <Modal
                open={numberPickerOpen}
                onClose={() => setNumberPickerOpen(false)}
                css={numberPickerStyle}
            >
                <Box sx={modalContentStyle}>
                    <ScrollPicker
                        type="weight"
                        label="중량"
                        onChangeHandler={recordChangeHandler}
                        valueState={routineRecordValue}
                    />
                    <ScrollPicker
                        type="count"
                        label="횟수"
                        onChangeHandler={recordChangeHandler}
                        valueState={routineRecordValue}
                    />
                    <button onClick={pickerOkHandler}>OK</button>
                </Box>
            </Modal>

            <AppFooter
                footerViewFlag={footerViewFlag}
                toggleFooterViewHandler={toggleFooterViewHandler}
            />
        </div>
    );
};

export default HealthPage;
