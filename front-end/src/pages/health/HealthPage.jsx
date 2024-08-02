import React, { useState } from "react";
import ScrollPicker from "../../common/components/scrollPicker/ScrollPicker";
import AppFooter from "../../common/components/appFooter/AppFooter";
import { checkBoxStyle, healthCardContentStyle, healthCardIconStyle, healthCardTitleBoxStyle, healthCardTitleStyle, healthPageBodyStyle, modalContentStyle, numberPickerStyle, subTitleStyle, titleStyle, workoutSetInfoStyle} from "./HealthPageStyle";
import healthIcon from "@img/sports/health-white.png";
import circleCheckIcon from "@img/circle-check-icon.png"
import Navbar from "../../common/components/navbar/Navbar";
import HealthCard from "./components/HealthCard";
import { Box, Modal } from "@mui/material";
import Calendar from "./components/Calendar";


const HealthPage = () => {
    const [pickerValue, setPickerValue] = useState({});
    const [numberPickerOpen, setNumberPickerOpen] = useState(false);

    const numberPickerHandler = () => {
        setNumberPickerOpen(true);
    };

    const pickerOkHandler = ()=>{
        setNumberPickerOpen(false);
        
    }

    return (
        <div css={healthPageBodyStyle}>
            <Navbar logo={healthIcon}></Navbar>

            <Calendar></Calendar>
            <HealthCard addStyle={`width:90%;display:flex;flex-direction:column;justify-content:start;`}>
                <div css={healthCardTitleStyle}>
                    <div css={healthCardIconStyle}>
                        <img src={healthIcon}/>
                    </div>
                    <div css={healthCardTitleBoxStyle}>
                        <h3 css={titleStyle}>bbbbb</h3>
                        <div css={subTitleStyle}>
                            <span>#어깨</span>
                            <button>Done</button>
                        </div>
                    </div>
                </div>
                <ul css={healthCardContentStyle}>
                    <li>
                        <div css={workoutSetInfoStyle} onClick={numberPickerHandler}>
                            <div>1.</div>
                            <div>100Kg</div>
                            <div>10회</div>
                        </div>
                        <div css={checkBoxStyle}><img src={circleCheckIcon}/></div>
                    </li>
                    <li>
                        <div css={workoutSetInfoStyle} onClick={numberPickerHandler}>
                            <div>1.</div>
                            <div>100Kg</div>
                            <div>10회</div>
                        </div>
                        <div css={checkBoxStyle}><img src={circleCheckIcon}/></div>
                    </li>
                    <li>
                        <div css={workoutSetInfoStyle} onClick={numberPickerHandler}>
                            <div>99.</div>
                            <div>100Kg</div>
                            <div>3330회</div>
                        </div>
                        <div css={checkBoxStyle}><img src={circleCheckIcon}/></div>
                    </li>
                    <li>
                        <div css={workoutSetInfoStyle} onClick={numberPickerHandler}>
                            <div>1.</div>
                            <div>100Kg</div>
                            <div>10회</div>
                        </div>
                        <div css={checkBoxStyle}><img src={circleCheckIcon}/></div>
                    </li>
                </ul>
            </HealthCard>
            
            
            <Modal open={numberPickerOpen} onClose={()=>setNumberPickerOpen(false)} css={numberPickerStyle}>
                <Box sx={modalContentStyle}>
                    <ScrollPicker type="weight" label="중량"/>
                    <ScrollPicker type="count" label="횟수"/>
                    <button onClick={pickerOkHandler}>OK</button>
                </Box>
            </Modal>


            <AppFooter />
        </div>
    );
};

export default HealthPage;
