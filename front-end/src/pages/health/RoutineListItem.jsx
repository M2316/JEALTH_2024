import React, { useState } from "react";
import { motion } from "framer-motion";
import { BsImageFill } from "react-icons/bs";
import HealthCard from "./components/HealthCard";
import {
    RoutineImgBoxStyle,
    RoutineInfoStyle,
    RoutineNameStyle,
    RoutineSaveInfoStyle,
    RoutineTagStyle,
} from "./RoutineListItemStyle";
import { useSelector } from "react-redux";
const RoutineListItem = ({ data: dataProps, id }) => {
    const [data, setData] = useState(dataProps); //props로 받아온 data를 state로 관리

    console.log(data);

    const tagLevel1 = useSelector((state) => state.routineManage.tagLevel1);
    const tagLevel2 = useSelector((state) => state.routineManage.tagLevel2);
    const tagLevel3 = useSelector((state) => state.routineManage.tagLevel3);

    return (
        <motion.div
            initial={{ y: -20, opacity: 0, transition: { duration: 0.4 } }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.4 } }}
            exit={{ y: -20, opacity: 0, transition: { duration: 0.4 } }}
        >
            <HealthCard
                addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}
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
            </HealthCard>
        </motion.div>
    );
};

export default RoutineListItem;
