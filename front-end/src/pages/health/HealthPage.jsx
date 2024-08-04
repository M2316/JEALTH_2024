import React, { useState } from "react";
import ScrollPicker from "../../common/components/scrollPicker/ScrollPicker";
import AppFooter from "../../common/components/appFooter/AppFooter";
import { checkBoxStyle, healthCardContentStyle, healthCardIconStyle, healthCardTitleBoxStyle, healthCardTitleStyle, healthPageBodyStyle, modalContentStyle, numberPickerStyle, subTitleStyle, titleStyle, workoutSetBoxStyle, workoutSetInfoStyle} from "./HealthPageStyle";
import healthIcon from "@img/sports/health-white.png";
import deleteIcon from "@img/record-delete.png";
import uncheckIcon from "@img/record-uncheck.png";
import clearIcon from "@img/record-clear.png";
import circleCheckIcon from "@img/circle-check-icon.png"
import setAddIcon from "@img/set-add-btn-icon.png"
import Navbar from "../../common/components/navbar/Navbar";
import HealthCard from "./components/HealthCard";
import { Box, Modal } from "@mui/material";
import Calendar from "./components/Calendar";
import {motion} from "framer-motion";


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
                        <motion.div drag="x" dragConstraints={{left: 0, right: 0}} dragElastic={0.5} css={workoutSetBoxStyle} >
                            <img src={uncheckIcon}/>
                            <div css={workoutSetInfoStyle} onClick={numberPickerHandler}>
                                <div>1.</div>
                                <div>100Kg</div>
                                <div>10회</div>
                            </div>
                            <div css={checkBoxStyle}><img src={circleCheckIcon}/></div>
                            <img src={deleteIcon}/>
                        </motion.div>
                        
                    </li>
                    <li>
                        <motion.div drag="x" dragConstraints={{left: 0, right: 0}} dragElastic={0.5} css={workoutSetBoxStyle} >
                            <img src={clearIcon}/>
                            <div css={workoutSetInfoStyle} onClick={numberPickerHandler}>
                                <div>2.</div>
                                <div>100Kg</div>
                                <div>10회</div>
                            </div>
                            <div css={checkBoxStyle}><img src={circleCheckIcon}/></div>
                            <img src={deleteIcon}/>
                        </motion.div>
                    </li>
                    <li>
                        <motion.div drag="x" dragConstraints={{left: 0, right: 0}} dragElastic={0.5} css={workoutSetBoxStyle} >
                            <img src={clearIcon}/>
                            <div css={workoutSetInfoStyle} onClick={numberPickerHandler}>
                                <div>3.</div>
                                <div>100Kg</div>
                                <div>10회</div>
                            </div>
                            <div css={checkBoxStyle}><img src={circleCheckIcon}/></div>
                            <img src={deleteIcon}/>
                        </motion.div>
                    </li>
                    <li>
                        <motion.div drag="x" dragConstraints={{left: 0, right: 0}} dragElastic={0.5} css={workoutSetBoxStyle} >
                            <img src={clearIcon}/>
                            <div css={workoutSetInfoStyle} onClick={numberPickerHandler}>
                                <div>4.</div>
                                <div>100Kg</div>
                                <div>10회</div>
                            </div>
                            <div css={checkBoxStyle}><img src={circleCheckIcon}/></div>
                            <img src={deleteIcon}/>
                        </motion.div>
                    </li>
                    <li>
                        <motion.div drag="x" dragConstraints={{left: 0, right: 0}} dragElastic={0.5} css={workoutSetBoxStyle} >
                            <img src={clearIcon}/>
                            <div css={workoutSetInfoStyle} onClick={numberPickerHandler}>
                                <div>4.</div>
                                <div>100Kg</div>
                                <div>10회</div>
                            </div>
                            <div css={checkBoxStyle}><img src={circleCheckIcon}/></div>
                            <img src={deleteIcon}/>
                        </motion.div>
                    </li>
                    <li>
                        <motion.div drag="x" dragConstraints={{left: 0, right: 0}} dragElastic={0.5} css={workoutSetBoxStyle} >
                            <img src={clearIcon}/>
                            <div css={workoutSetInfoStyle} onClick={numberPickerHandler}>
                                <div>4.</div>
                                <div>100Kg</div>
                                <div>10회</div>
                            </div>
                            <div css={checkBoxStyle}><img src={circleCheckIcon}/></div>
                            <img src={deleteIcon}/>
                        </motion.div>
                    </li>
                    <li>
                        <motion.div drag="x" dragConstraints={{left: 0, right: 0}} dragElastic={0.5} css={workoutSetBoxStyle} >
                            <img src={clearIcon}/>
                            <div css={workoutSetInfoStyle} onClick={numberPickerHandler}>
                                <div>4.</div>
                                <div>100Kg</div>
                                <div>10회</div>
                            </div>
                            <div css={checkBoxStyle}><img src={circleCheckIcon}/></div>
                            <img src={deleteIcon}/>
                        </motion.div>
                    </li>
                    <img src={setAddIcon}/>
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
