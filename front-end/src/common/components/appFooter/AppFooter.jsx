import { css } from "@emotion/react";
import React, { useState } from "react";
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
import { motion } from "framer-motion";

const clickVibrateHandler = (vibCycle=[60]) =>{ //진동 함수
    if (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true
    ) {
        window.navigator.vibrate(vibCycle);
    }
}


const AppFooter = () => {
    const [footerViewFlag, setFooterViewFlag] = useState(false);

    // 루틴 목록 modal open
    const [routineListModalFlag, setRoutineListModalFlag] = useState(false);

    // 루틴 수정 modal open
    const [routineModifyModalFlag, setRoutineModifyModalFlag] = useState(false);

    return (
        <div>
            <div css={footerBtnCss}>
                <img
                    src={plusIcon}
                    width="50px"
                    onClick={() => {
                        clickVibrateHandler([60,30,60]);
                        setFooterViewFlag(!footerViewFlag);
                    }}
                />
            </div>
            {footerViewFlag && (
                <div css={footerContainerCss}>
                    <div css={contentBoxCss}>
                        <motion.div
                            css={iconBox}
                            onClick={() =>{
                                clickVibrateHandler();
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
                        <motion.div
                            css={iconBox}
                            onClick={() =>{
                                clickVibrateHandler();
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
                            onClick={() =>{
                                clickVibrateHandler();
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
                            onClick={() =>{
                                clickVibrateHandler();
                            }}
                            whileTap={{
                                scale: 1.2,
                                transition: { duration: 0.05 },
                            }}
                            
                        >
                            <MdOutlineConstruction></MdOutlineConstruction>
                            <span>개발중...</span>
                        </motion.div>
                    </div>
                </div>
            )}

            <Modal
                open={routineListModalFlag}
                onClose={() => setRoutineListModalFlag(false)}
            >
                <Box sx={ModalStyle}>
                    <RoutineListModal onClose={setRoutineListModalFlag} />
                </Box>
            </Modal>

            <Modal
                open={routineModifyModalFlag}
                onClose={() => setRoutineModifyModalFlag(false)}
            >
                <Box sx={ModalStyle}>
                    <RoutineModifyModal onClose={setRoutineModifyModalFlag} />
                </Box>
            </Modal>
        </div>
    );
};

export default AppFooter;
