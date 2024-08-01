import { css } from "@emotion/react";
import React, { useState } from "react";
import plusIcon from "@img/plus-icon.png";
import { RiMenuAddFill } from "react-icons/ri";
import { MdOutlineConstruction } from "react-icons/md";
import { contentBoxCss, footerBtnCss, footerContainerCss, iconBox, ModalStyle } from "./AppFooterStyle"
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { Box, Modal } from "@mui/material";
import RoutineListModal from "../../../pages/health/RoutineListModal";
import RoutineModifyModal from "../../../pages/health/RoutineModifyModal";

const AppFooter = () => {

    const [footerViewFlag,setFooterViewFlag] = useState(false);

    // 루틴 목록 modal open
    const [routineListModalFlag,setRoutineListModalFlag] = useState(false);

    // 루틴 수정 modal open
    const [routineModifyModalFlag,setRoutineModifyModalFlag] = useState(false);






    return (
        <div>
            <div css={footerBtnCss}>
                <img src={plusIcon} width="50px" onClick={()=>{setFooterViewFlag(!footerViewFlag)}}/>
                
            </div>
            {
                footerViewFlag && 
                <div css={footerContainerCss}>
                    <div css={contentBoxCss}>
                        <div css={iconBox} onClick={()=>setRoutineListModalFlag(true)}>
                            <RiMenuAddFill></RiMenuAddFill>
                            <span>루틴 목록</span>
                        </div>
                        <div css={iconBox} onClick={()=>setRoutineModifyModalFlag(true)}>
                            <HiOutlineClipboardDocumentList></HiOutlineClipboardDocumentList>
                            <span>루틴 수정</span>
                            </div>
                        <div css={iconBox}>
                            <MdOutlineConstruction></MdOutlineConstruction>
                            <span>개발중...</span>
                        </div>
                        <div css={iconBox}>
                            <MdOutlineConstruction></MdOutlineConstruction>
                            <span>개발중...</span>
                        </div>
                    </div>
                </div>
            }    

            <Modal open={routineListModalFlag} onClose={()=>setRoutineListModalFlag(false)}>
                <Box sx={ModalStyle}>
                    <RoutineListModal onClose={setRoutineListModalFlag}/>
                </Box> 
            </Modal>
            
            <Modal open={routineModifyModalFlag} onClose={()=>setRoutineModifyModalFlag(false)}>
                <Box sx={ModalStyle}>
                    <RoutineModifyModal onClose={setRoutineModifyModalFlag}/>
                </Box>

            </Modal>
            

        </div>
        
    );
};

export default AppFooter;
