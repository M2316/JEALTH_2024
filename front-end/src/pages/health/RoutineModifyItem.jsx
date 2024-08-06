import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import HealthCard from "./components/HealthCard";
import { BsImageFill } from "react-icons/bs";
import Input from "../../common/components/input/Input";
import {
    RoutineContentTagBoxStyle,
    RoutineImgBoxStyle,
    RoutineInputBoxStyle,
    RoutineTagStyle,
    RoutineTitleBoxStyle,
} from "./RoutineModifyItemStyle";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const RoutineModifyItem = ({ data: dataProps, id }) => {
    const [data, setData] = useState(dataProps); //props로 받아온 data를 state로 관리

    const tagLevel1 = useSelector((state) => state.routineManage.tagLevel1);
    const tagLevel2 = useSelector((state) => state.routineManage.tagLevel2);
    const tagLevel3 = useSelector((state) => state.routineManage.tagLevel3);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const tagOnClickHandler = (cardItem, idx, selectTagLevel) => {
        touchVibrateUtil(); //진동 실행
    };

    return (
        <motion.div
            initial={{ y: -20, opacity: 0, transition: { duration: 0.4 } }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.4 } }}
            exit={{ y: -20, opacity: 0, transition: { duration: 0.4 } }}
        >
            <HealthCard
                addStyle={`width:100%;justify-content:start; align-items:center;padding:10px; box-sizing: border-box;flex-direction: column;`}
            >
                <div css={RoutineTitleBoxStyle}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInputBoxStyle}>
                        <Input
                            inputIcon="info"
                            valueType="text"
                            inputChangeHandler={(e) =>
                                setSearchVal(e.target.value)
                            }
                            inputClearHandler={() => setSearchVal("")}
                            inputState={data.name}
                            placeholder="루틴 명을 입력해 주세요."
                            addStyle={`width:100%;`}
                            name={data.name}
                        ></Input>
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
            </HealthCard>
        </motion.div>
    );
};

export default RoutineModifyItem;
