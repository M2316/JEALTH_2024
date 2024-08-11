import React, { useRef, useState } from "react";
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
    subTitleStyle,
    titleStyle,
    workoutSetBoxStyle,
    workoutSetInfoStyle,
} from "./HealthPageStyle";
import healthIcon from "@img/sports/health-white.png";
import deleteIcon from "@img/record-delete.png";
import uncheckIcon from "@img/record-uncheck.png";
import circleCheckIcon from "@img/circle-check-icon.png";
import setAddIcon from "@img/set-add-btn-icon.png";
import Navbar from "../../common/components/navbar/Navbar";
import HealthCard from "./components/HealthCard";
import { Box, Modal } from "@mui/material";
import Calendar from "./components/Calendar";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
    routineRecordAppend,
    routineRecordUpdate,
} from "../../redux/reducers/workoutRecordSlice";
import touchVibrateUtil from "../../utils/touchVibrateUtil";

const HealthPage = () => {
    const [routineRecordValue, setRoutineRecordValue] = useState({});
    const [numberPickerOpen, setNumberPickerOpen] = useState(false);

    const [selectedRecord, setSelectedRecord] = useState({});

    //redex state 코드
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.calendar); // 캘린더 선택한 날짜
    const thisDayRoutine = useSelector(
        (state) => state.workoutRecord.workoutInfo
    ).find((filterItem) => filterItem.workoutDate === selectedDate.strDate); // 선택 일의 루틴

    const numberPickerHandler = (e, routineId, recordSetNum) => {
        setSelectedRecord({
            routineId,
            recordSetNum,
        });

        const selectedSetInfo = thisDayRoutine.workoutList.find(findItem=>findItem.id === routineId).workSetList.find(findItem=>findItem.setNum === recordSetNum);
        setRoutineRecordValue(selectedSetInfo)
        setNumberPickerOpen(true);
    };

    //record 적용
    const pickerOkHandler = () => {
        setNumberPickerOpen(false);
        dispatch(
            routineRecordUpdate({
                workDate: selectedDate.strDate,
                id: selectedRecord.routineId,
                setNum: selectedRecord.recordSetNum,
                weight: routineRecordValue.weight,
                weightUnit: routineRecordValue.weightUnit,
                count: routineRecordValue.count,
                countUnit: routineRecordValue.countUnit,
            })
        );
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

    const recordSetAppendHandler = (e,routineId) => {
        touchVibrateUtil([100, 50, 100, 50, 100]);
        dispatch(routineRecordAppend({ id:routineId, workDate:selectedDate.strDate }));
        e.target.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div css={healthPageBodyStyle}>
            <Navbar logo={healthIcon}></Navbar>

            <Calendar></Calendar>
            {thisDayRoutine ?
                thisDayRoutine.workoutList.map((routine, idx) => (
                    <HealthCard
                        addStyle={`width:90%;display:flex;flex-direction:column;justify-content:start;`}
                        key={routine.id + idx}
                    >
                        <div css={healthCardTitleStyle}>
                            <div css={healthCardIconStyle}>
                                <img src={healthIcon} />
                            </div>
                            <div css={healthCardTitleBoxStyle}>
                                <h3 css={titleStyle}>{routine.name}</h3>
                                <div css={subTitleStyle}>
                                    <span>#{routine.tagLevel2}</span>
                                    <button>Done</button>
                                </div>
                            </div>
                        </div>

                        <ul css={healthCardContentStyle}>
                            {routine.workSetList &&
                                routine.workSetList.map((record) => (
                                    <li key={routine.id + idx + record.setNum}>
                                        <motion.div
                                            drag="x"
                                            dragConstraints={{
                                                left: 0,
                                                right: 0,
                                            }}
                                            dragElastic={0.5}
                                            css={workoutSetBoxStyle}
                                        >
                                            <img src={uncheckIcon} />
                                            <div
                                                css={workoutSetInfoStyle}
                                                onClick={(e) =>
                                                    numberPickerHandler(
                                                        e,
                                                        routine.id,
                                                        record.setNum
                                                    )
                                                }
                                            >
                                                <div>{record.setNum}.</div>
                                                <div>
                                                    {record.weight}
                                                    {record.weightUnit}
                                                </div>
                                                <div>
                                                    {record.count}
                                                    {record.countUnit}
                                                </div>
                                            </div>
                                            <div css={checkBoxStyle}>
                                                <img src={circleCheckIcon} />
                                            </div>
                                            <img src={deleteIcon} />
                                        </motion.div>
                                    </li>
                                ))}

                            <img
                                src={setAddIcon}
                                onClick={(e) =>
                                    recordSetAppendHandler(e,routine.id)
                                }
                            />
                        </ul>
                    </HealthCard>
                )):(
                    <HealthCard
                    addStyle={`width:90%;display:flex;flex-direction:column;justify-content:start;`}
                >
                    <div css={healthCardTitleStyle}>
                        <div css={healthCardIconStyle}>
                            <img src={healthIcon} />
                        </div>
                        <div css={EmptyCardTitleBoxStyle}>
                            <span css={titleStyle}>Routine list is empty.</span>
                        </div>
                    </div>

                </HealthCard>  
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

            <AppFooter />
        </div>
    );
};

export default HealthPage;
