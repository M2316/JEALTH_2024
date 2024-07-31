import React from "react";
import { css } from "@emotion/react";
import { RoutineImgBoxStyle, RoutineInfoStyle, RoutineListContainerStyle, RoutineListTitleStyle, RoutineModalContentStyle, RoutineModalOkButStyle, RoutineNameStyle, RoutineSaveInfoStyle, RoutineTagStyle } from "./RoutineListModalStyle";
import { Box } from "@mui/material";
import HealthCard from "./components/HealthCard"
import { BsImageFill } from "react-icons/bs";

const RoutineListModal = ({onClose}) => {
    return (
        <div css={RoutineListContainerStyle}>
            <div css={RoutineListTitleStyle}>
                <h1>종목 선택</h1>
            </div>
            <div css={RoutineModalContentStyle}>
                <HealthCard addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInfoStyle}>
                        <ul css={RoutineTagStyle}>
                           <li>#상체</li> 
                           <li>#가슴</li> 
                           <li>#프리웨이트</li> 
                        </ul>
                        <div css={RoutineNameStyle}>
                            <span>벤치 프레스1</span>
                        </div>
                        <div css={RoutineSaveInfoStyle}>
                            <span>최근 수행일 : 2024-07-12</span>
                            <span>최대 중량 : 110Kg</span>

                        </div>
                    </div>
                </HealthCard>
                <HealthCard addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInfoStyle}>
                        <ul css={RoutineTagStyle}>
                           <li>#상체</li> 
                           <li>#가슴</li> 
                           <li>#프리웨이트</li> 
                        </ul>
                        <div css={RoutineNameStyle}>
                            <span>벤치 프레스1</span>
                        </div>
                        <div css={RoutineSaveInfoStyle}>
                            <span>최근 수행일 : 2024-07-12</span>
                            <span>최대 중량 : 110Kg</span>

                        </div>
                    </div>
                </HealthCard>
                <HealthCard addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInfoStyle}>
                        <ul css={RoutineTagStyle}>
                           <li>#상체</li> 
                           <li>#가슴</li> 
                           <li>#프리웨이트</li> 
                        </ul>
                        <div css={RoutineNameStyle}>
                            <span>벤치 프레스1</span>
                        </div>
                        <div css={RoutineSaveInfoStyle}>
                            <span>최근 수행일 : 2024-07-12</span>
                            <span>최대 중량 : 110Kg</span>

                        </div>
                    </div>
                </HealthCard>
                <HealthCard addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInfoStyle}>
                        <ul css={RoutineTagStyle}>
                           <li>#상체</li> 
                           <li>#가슴</li> 
                           <li>#프리웨이트</li> 
                        </ul>
                        <div css={RoutineNameStyle}>
                            <span>벤치 프레스1</span>
                        </div>
                        <div css={RoutineSaveInfoStyle}>
                            <span>최근 수행일 : 2024-07-12</span>
                            <span>최대 중량 : 110Kg</span>

                        </div>
                    </div>
                </HealthCard>
                <HealthCard addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInfoStyle}>
                        <ul css={RoutineTagStyle}>
                           <li>#상체</li> 
                           <li>#가슴</li> 
                           <li>#프리웨이트</li> 
                        </ul>
                        <div css={RoutineNameStyle}>
                            <span>벤치 프레스1</span>
                        </div>
                        <div css={RoutineSaveInfoStyle}>
                            <span>최근 수행일 : 2024-07-12</span>
                            <span>최대 중량 : 110Kg</span>

                        </div>
                    </div>
                </HealthCard>
                <HealthCard addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInfoStyle}>
                        <ul css={RoutineTagStyle}>
                           <li>#상체</li> 
                           <li>#가슴</li> 
                           <li>#프리웨이트</li> 
                        </ul>
                        <div css={RoutineNameStyle}>
                            <span>벤치 프레스1</span>
                        </div>
                        <div css={RoutineSaveInfoStyle}>
                            <span>최근 수행일 : 2024-07-12</span>
                            <span>최대 중량 : 110Kg</span>

                        </div>
                    </div>
                </HealthCard>
                <HealthCard addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInfoStyle}>
                        <ul css={RoutineTagStyle}>
                           <li>#상체</li> 
                           <li>#가슴</li> 
                           <li>#프리웨이트</li> 
                        </ul>
                        <div css={RoutineNameStyle}>
                            <span>벤치 프레스1</span>
                        </div>
                        <div css={RoutineSaveInfoStyle}>
                            <span>최근 수행일 : 2024-07-12</span>
                            <span>최대 중량 : 110Kg</span>

                        </div>
                    </div>
                </HealthCard>
                <HealthCard addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInfoStyle}>
                        <ul css={RoutineTagStyle}>
                           <li>#상체</li> 
                           <li>#가슴</li> 
                           <li>#프리웨이트</li> 
                        </ul>
                        <div css={RoutineNameStyle}>
                            <span>벤치 프레스1</span>
                        </div>
                        <div css={RoutineSaveInfoStyle}>
                            <span>최근 수행일 : 2024-07-12</span>
                            <span>최대 중량 : 110Kg</span>

                        </div>
                    </div>
                </HealthCard>
                <HealthCard addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInfoStyle}>
                        <ul css={RoutineTagStyle}>
                           <li>#상체</li> 
                           <li>#가슴</li> 
                           <li>#프리웨이트</li> 
                        </ul>
                        <div css={RoutineNameStyle}>
                            <span>벤치 프레스1</span>
                        </div>
                        <div css={RoutineSaveInfoStyle}>
                            <span>최근 수행일 : 2024-07-12</span>
                            <span>최대 중량 : 110Kg</span>

                        </div>
                    </div>
                </HealthCard>
                <HealthCard addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInfoStyle}>
                        <ul css={RoutineTagStyle}>
                           <li>#상체</li> 
                           <li>#가슴</li> 
                           <li>#프리웨이트</li> 
                        </ul>
                        <div css={RoutineNameStyle}>
                            <span>벤치 프레스1</span>
                        </div>
                        <div css={RoutineSaveInfoStyle}>
                            <span>최근 수행일 : 2024-07-12</span>
                            <span>최대 중량 : 110Kg</span>

                        </div>
                    </div>
                </HealthCard>
                <HealthCard addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInfoStyle}>
                        <ul css={RoutineTagStyle}>
                           <li>#상체</li> 
                           <li>#가슴</li> 
                           <li>#프리웨이트</li> 
                        </ul>
                        <div css={RoutineNameStyle}>
                            <span>벤치 프레스1</span>
                        </div>
                        <div css={RoutineSaveInfoStyle}>
                            <span>최근 수행일 : 2024-07-12</span>
                            <span>최대 중량 : 110Kg</span>

                        </div>
                    </div>
                </HealthCard>
                <HealthCard addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInfoStyle}>
                        <ul css={RoutineTagStyle}>
                           <li>#상체</li> 
                           <li>#가슴</li> 
                           <li>#프리웨이트</li> 
                        </ul>
                        <div css={RoutineNameStyle}>
                            <span>벤치 프레스1</span>
                        </div>
                        <div css={RoutineSaveInfoStyle}>
                            <span>최근 수행일 : 2024-07-12</span>
                            <span>최대 중량 : 110Kg</span>

                        </div>
                    </div>
                </HealthCard>
                <HealthCard addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInfoStyle}>
                        <ul css={RoutineTagStyle}>
                           <li>#상체</li> 
                           <li>#가슴</li> 
                           <li>#프리웨이트</li> 
                        </ul>
                        <div css={RoutineNameStyle}>
                            <span>벤치 프레스1</span>
                        </div>
                        <div css={RoutineSaveInfoStyle}>
                            <span>최근 수행일 : 2024-07-12</span>
                            <span>최대 중량 : 110Kg</span>

                        </div>
                    </div>
                </HealthCard>
                <HealthCard addStyle={`height:70px; width:100%;justify-content:start; align-items:center;`}>
                    <div css={RoutineImgBoxStyle}>
                        <BsImageFill></BsImageFill>
                    </div>
                    <div css={RoutineInfoStyle}>
                        <ul css={RoutineTagStyle}>
                           <li>#상체</li> 
                           <li>#가슴</li> 
                           <li>#프리웨이트</li> 
                        </ul>
                        <div css={RoutineNameStyle}>
                            <span>벤치 프레스1</span>
                        </div>
                        <div css={RoutineSaveInfoStyle}>
                            <span>최근 수행일 : 2024-07-12</span>
                            <span>최대 중량 : 110Kg</span>

                        </div>
                    </div>
                </HealthCard>
            </div>
            <div css={RoutineModalOkButStyle}>
                <button onClick={()=>onClose()}>OK</button>
            </div>
        </div>
    );
};
{
    /* <RoutineListModal/> */
}
export default RoutineListModal;
