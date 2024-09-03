import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import plusIcon from "@img/plus-icon.png";
import { RiMenuAddFill } from "react-icons/ri";
import { MdOutlineConstruction } from "react-icons/md";
import {
    contentBoxCss,
    footerBtnCss,
    footerContainerCss,
    iconBox,
    ModalStyle,
} from "./AppFooterStyle";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { Box, Modal } from "@mui/material";
import RoutineListModal from "../../../pages/health/RoutineListModal";
import RoutineModifyModal from "../../../pages/health/RoutineModifyModal";
import { AnimatePresence, motion } from "framer-motion";
import touchVibrateUtil from "../../../utils/touchVibrateUtil";
import { useRoutineListQuery } from "../../../hooks/useRoutineListHook";
import LoadingPage from "../loadingPage/LoadingPage";
import { useDispatch } from "react-redux";
import { RoutineListInit } from "../../../redux/reducers/health/routineManageSlice";

const AppFooter = ({footerViewFlag, toggleFooterViewHandler}) => {

    //routine List 가져오는 Request-Query
    const {data:routineData,isFetching:routineIsFetching,refetch:routineRefetch} = useRoutineListQuery();


    // 루틴 목록 modal open
    const [routineListModalFlag, setRoutineListModalFlag] = useState(false);

    // 루틴 수정 modal open
    const [routineModifyModalFlag, setRoutineModifyModalFlag] = useState(false);

    //redex state 코드
    const dispatch = useDispatch();

    useEffect(() => {
        if (
            routineListModalFlag == undefined ||
            routineModifyModalFlag == undefined
        ) {
            console.log("error");
        }
    }, []);


    if (
        routineListModalFlag == undefined ||
        routineModifyModalFlag == undefined
    ) {
        console.log("error");
    }


    //routine modify modal open 이벤트 처리
    const routineModifyModalCloseHandler = () => {
        routineRefetch();
        setRoutineModifyModalFlag(false);
    }


    //RoutineManageSlice에 초기 routine list state값 셋팅
    useEffect(()=>{
        if(routineData){                
            dispatch(RoutineListInit(routineData))
        }
    },[routineData])

    return (
        <div>
            {routineIsFetching && <LoadingPage></LoadingPage>}
            <div css={footerBtnCss}>
                <img
                    src={plusIcon}
                    width="50px"
                    onClick={() => {
                        touchVibrateUtil([60, 30, 60]);
                        toggleFooterViewHandler();
                    }}
                />
            </div>
            {footerViewFlag && (
                <div css={footerContainerCss}>
                    <div css={contentBoxCss}>
                        <motion.div
                            css={iconBox}
                            onClick={() => {
                                touchVibrateUtil();
                            }}
                            whileTap={{
                                scale: 1.2,
                                transition: { duration: 0.05 },
                            }}
                        >
                            <MdOutlineConstruction></MdOutlineConstruction>
                            <span>개발중...</span>
                        </motion.div>
                        <motion.div
                            css={iconBox}
                            onClick={() => {
                                touchVibrateUtil();
                            }}
                            whileTap={{
                                scale: 1.2,
                                transition: { duration: 0.05 },
                            }}
                        >
                            <MdOutlineConstruction></MdOutlineConstruction>
                            <span>개발중...</span>
                        </motion.div>
                        <motion.div
                            css={iconBox}
                            onClick={() => {
                                touchVibrateUtil();
                                setRoutineModifyModalFlag(true);
                            }}
                            whileTap={{
                                scale: 1.2,
                                transition: { duration: 0.05 },
                            }}
                        >
                            <HiOutlineClipboardDocumentList></HiOutlineClipboardDocumentList>
                            <span>루틴 수정</span>
                        </motion.div>
                        <motion.div
                            css={iconBox}
                            onClick={() => {
                                touchVibrateUtil();
                                setRoutineListModalFlag(true);
                            }}
                            whileTap={{
                                scale: 1.2,
                                transition: { duration: 0.05 },
                            }}
                        >
                            <RiMenuAddFill></RiMenuAddFill>
                            <span>루틴 목록</span>
                        </motion.div>
                    </div>
                </div>
            )}
            <Modal
                open={routineModifyModalFlag}
                onClose={routineModifyModalCloseHandler}
            >
                <Box sx={ModalStyle}>
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <RoutineModifyModal
                            onClose={routineModifyModalCloseHandler}
                            isOpen={routineModifyModalFlag}
                        />
                    </motion.div>
                </Box>
            </Modal>

            <Modal
                open={routineListModalFlag}
                onClose={() => setRoutineListModalFlag(false)}
            >
                <Box sx={ModalStyle}>
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        key="routineListModal"
                    >
                        <RoutineListModal
                            onClose={() => setRoutineListModalFlag(false)}
                            isOpen={routineListModalFlag}
                        />
                    </motion.div>
                </Box>
            </Modal>
        </div>
    );
};

export default AppFooter;
