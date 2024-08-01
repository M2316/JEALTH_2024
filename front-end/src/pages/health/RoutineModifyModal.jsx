import React, { useState } from "react";
import { css } from "@emotion/react";
import {
    RoutineContentTagBoxStyle,
    RoutineImgBoxStyle,
    RoutineInputBoxStyle,
    RoutineModifyContainerStyle,
    RoutineModifyContentStyle,
    RoutineModifyTitleStyle,
    RoutineSearchTagStyle,
    RoutineTitleBoxStyle,
    RoutineTagStyle,
    RoutineModalOkButStyle
} from "./RoutineModifyModalStyle";
import Input from "../../common/components/input/Input";
import HealthCard from "./components/HealthCard";
import { BsImageFill } from "react-icons/bs";

const RoutineModifyModal = ({ onClose }) => {
    const [searchVal, setSearchVal] = useState("");

    return (
        <div css={RoutineModifyContainerStyle}>
            <div css={RoutineModifyTitleStyle}>
                <Input
                    inputIcon="info"
                    valueType="text"
                    inputChangeHandler={(e) => setSearchVal(e.target.value)}
                    inputClearHandler={() => setSearchVal("")}
                    inputState={searchVal}
                    placeholder="검색어를 입력해 주세요."
                    addStyle={`width:60%; margin:0;`}
                    name="searchVal"
                ></Input>
                <ul css={RoutineSearchTagStyle}>
                    <li>#가슴</li>
                    <li>#프리웨이트</li>
                </ul>
            </div>
            <div css={RoutineModifyContentStyle}>
                <HealthCard addStyle={`width:100%;justify-content:start; align-items:center;padding:10px; box-sizing: border-box;flex-direction: column;`}>
                    <div css={RoutineTitleBoxStyle}>
                        <div css={RoutineImgBoxStyle}>
                            <BsImageFill></BsImageFill>
                        </div>
                        <div css={RoutineInputBoxStyle}>
                            <Input
                                inputIcon="info"
                                valueType="text"
                                inputChangeHandler={(e) => setSearchVal(e.target.value)}
                                inputClearHandler={() => setSearchVal("")}
                                inputState={searchVal}
                                placeholder="검색어를 입력해 주세요."
                                addStyle={`width:100%;`}
                                name="searchVal"
                            ></Input>

                        </div>
                    </div>
                    <div css={RoutineContentTagBoxStyle}>
                        <ul css={RoutineTagStyle}>
                            <li>#가슴</li>
                            <li>#하체</li>
                            <li>#코어</li>
                            <li>#전신</li>
                        </ul>
                        <ul css={RoutineTagStyle}>
                            <li>#가슴</li>
                            <li>#등</li>
                            <li>#이두</li>
                            <li>#삼두</li>
                            <li>#어깨</li>
                            <li>#복근</li>
                        </ul>
                        <ul css={RoutineTagStyle}>
                            <li>#프리웨이트</li>
                            <li>#머신웨이트</li>
                            <li>#바디웨이트</li>
                        </ul>

                    </div>
                    
                </HealthCard>
            </div>
            <div css={RoutineModalOkButStyle}>
                <button onClick={()=>onClose()}>OK</button>
            </div>
        </div>
    );
};

export default RoutineModifyModal;
