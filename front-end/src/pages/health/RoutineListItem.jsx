import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsImageFill } from "react-icons/bs";
import HealthCard from "./components/HealthCard";
import checkIcon from "@img/check-icon-4.png"
import {
    RoutineImgBoxStyle,
    RoutineInfoStyle,
    RoutineNameStyle,
    RoutineSaveInfoStyle,
    RoutineSelectedBoxStyle,
    RoutineTagStyle,
} from "./RoutineListItemStyle";
import touchVibrateUtil from "../../utils/touchVibrateUtil";
const RoutineListItem = ({ data, id, cardClickHandler,selectedFlag}) => {

    const cardSelectorHandler = (e)=>{
        touchVibrateUtil();
        cardClickHandler(data);
    }

    return (
        <motion.div
            onClick={(e)=>{cardSelectorHandler(e)}}
        >
            <HealthCard
                addStyle={`height:70px; width:100%;justify-content:start; align-items:center;position:relative;`}
            >
                <div css={RoutineImgBoxStyle}>
                    <BsImageFill></BsImageFill>
                </div>
                <div css={RoutineInfoStyle}>
                    <ul css={RoutineTagStyle}>
                        <li>{data.tagLevel1}</li>
                        <li>{data.tagLevel2}</li>
                        <li>{data.tagLevel3}</li>
                    </ul>
                    <div css={RoutineNameStyle}>
                        <span>{data.name}</span>
                    </div>
                    <div css={RoutineSaveInfoStyle}>
                        <span>최근 수행일 : 2024-07-12</span>
                        <span>최대 중량 : 110Kg</span>
                    </div>
                </div>
                {
                selectedFlag && (
                    <div css={RoutineSelectedBoxStyle}>
                        <div>
                            <img src={checkIcon}/>
                        </div>
                    </div>
                )
            }
            </HealthCard>
            
        </motion.div>
    );
};

export default RoutineListItem;
