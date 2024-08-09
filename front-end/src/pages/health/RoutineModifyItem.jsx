import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import HealthCard from "./components/HealthCard";
import { BsImageFill } from "react-icons/bs";
import {
    alertDialogStyle,
    RoutineContentTagBoxStyle,
    RoutineImgBoxStyle,
    RoutineInputBoxStyle,
    RoutineTagStyle,
    RoutineTitleBoxStyle,
} from "./RoutineModifyItemStyle";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import touchVibrateUtil from "../../utils/touchVibrateUtil";
import { RoutineNameChange, RoutineTagChange } from "../../redux/reducers/routineManageSlice";
import { IoCloudUploadOutline } from "react-icons/io5";
import { inputBoxStyle, inputGroupStyle } from "../../common/components/input/InputStyle";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";


const RoutineModifyItem = ({ id, setCardGroupChangeFlag}) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.routineManage.routineList).find(
        (item) => item.id === id
    );

    const tagLevel1 = useSelector((state) => state.routineManage.tagLevel1);
    const tagLevel2 = useSelector((state) => state.routineManage.tagLevel2);
    const tagLevel3 = useSelector((state) => state.routineManage.tagLevel3);

    const [routineName, setRoutineName] = useState(data.name);
    const routineNameRef = useRef();

    const tagOnClickHandler = (selectTag, idx, selectTagLevel) => {
        touchVibrateUtil(); //진동 실행
        dispatch(RoutineTagChange({
            routine:data,
            type:selectTagLevel,
            tag:selectTag
            
        }));
        if(selectTagLevel === 'level2'){
            setCardGroupChangeFlag(true);
        }
        
    };
    //루틴 명 변경 이벤트
    const routineStateChangeHandler = (e) => {
        animate(scope.current, { opacity: 1 });

        setRoutineName(routineNameRef.current.value);
    };
    //루틴 명 input clear 이벤트
    const inputClearHandler = (e)=>{
        routineNameRef.current.value = "";
    }

    useEffect(()=>{
        routineNameRef.current.value = data.name;
    },[])

    useEffect(() => {
        if (!routineName || routineName === data.name) {
            //이름이 변경되지 않았으면 return
            return;
        }
        touchVibrateUtil();
        dispatch(RoutineNameChange({ id: data.id, name: routineName }));

        setAlertFlag(true);

        clearTimeout(alertSetTimeoutRef.current);
        alertSetTimeoutRef.current = setTimeout(() => {
            alertRef.current &&
                animate(alertRef.current, {
                    opacity: 0,
                    scale: 0.8,
                    y: -10,
                }).then(() => {
                    setAlertFlag(false);
                });
        }, 1000);
    }, [routineName]);

    //애니메이션 관련 코드 start================================================================================
    const [exitAnimationFlag, setExitAnimationFlag] = useState(true);
    const [scope, animate] = useAnimate();
    const [alertFlag, setAlertFlag] = useState(false);
    const alertRef = useRef();
    const alertSetTimeoutRef = useRef();
    //애니메이션 관련 코드 end==================================================================================

    return (
        <motion.div
            exit={
                exitAnimationFlag && {
                    y: -20,
                    opacity: 0,
                    transition: { duration: 0.4 },
                }
            }
            ref={scope}
        >
            <HealthCard
                addStyle={`width:100%;justify-content:start; align-items:center;padding:10px; box-sizing: border-box;flex-direction: column; position: relative;`}
            >
                <div css={RoutineTitleBoxStyle}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInputBoxStyle}>
                        <div css={inputGroupStyle}>
                            <MdOutlineDriveFileRenameOutline />

                            <div css={inputBoxStyle}>
                                <input
                                    onBlur={() => {
                                        routineStateChangeHandler();
                                    }}
                                    ref={routineNameRef}
                                    css={css` font-size:12px !important;`}
                                />
                                {routineName && (
                                    <IoMdCloseCircle
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            inputClearHandler(e);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div css={RoutineContentTagBoxStyle}>
                    {tagLevel1 && (
                        <ul css={RoutineTagStyle}>
                            {tagLevel1.map((item, idx) => (
                                <motion.li
                                    whileTap={{
                                        scale: 1.4,
                                        transition: { duration: 0.2 },
                                    }}
                                    key={item + idx}
                                    data-tag-level="1"
                                    data-tag-value={item}
                                    css={css`
                                        background-color: ${data.tagLevel1 ===
                                        item
                                            ? "#5BB2C0"
                                            : "#556080"} !important;
                                        order: ${data.tagLevel1 === item
                                            ? -1
                                            : ""};
                                    `}
                                    onClick={(e) =>
                                        tagOnClickHandler(item, idx, "level1")
                                    }
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    )}
                    {tagLevel2 && (
                        <ul css={RoutineTagStyle}>
                            {tagLevel2.map((item, idx) => (
                                <motion.li
                                    whileTap={{ scale: 1.4 }}
                                    key={item + idx}
                                    data-tag-level="2"
                                    data-tag-value={item}
                                    css={css`
                                        background-color: ${data.tagLevel2 ===
                                        item
                                            ? "#5BB2C0"
                                            : "#556080"} !important;
                                        order: ${data.tagLevel2 === item
                                            ? -1
                                            : ""};
                                    `}
                                    onClick={(e) =>
                                        tagOnClickHandler(item, idx, "level2")
                                    }
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    )}
                    {tagLevel3 && (
                        <ul css={RoutineTagStyle}>
                            {tagLevel3.map((item, idx) => (
                                <motion.li
                                    whileTap={{ scale: 1.4 }}
                                    key={item + idx}
                                    data-tag-level="3"
                                    data-tag-value={item}
                                    css={css`
                                        background-color: ${data.tagLevel3 ===
                                        item
                                            ? "#5BB2C0"
                                            : "#556080"} !important;
                                        ${data.tagLevel3 === item &&
                                        "order:-1;"}
                                    `}
                                    onClick={(e) =>
                                        tagOnClickHandler(item, idx, "level3")
                                    }
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    )}
                </div>
                {alertFlag && (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            css={alertDialogStyle}
                            ref={alertRef}
                            key={id}
                        >
                            <IoCloudUploadOutline />
                            <span>Save OK.</span>
                        </motion.div>
                    </AnimatePresence>
                )}
            </HealthCard>
        </motion.div>
    );
};

export default RoutineModifyItem;
