import { css } from "@emotion/react";

export const pickerContainerStyle = css`
    width: calc(100% - 30px);
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #191A1F;
    border-radius: 15px;
    box-shadow: 3px 3px 3px #323232;
`;

export const pickerLabelStyle = css`

    background-color: #262834;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    font-weight: 900;
    border-radius: 15px;
    margin-left: 10px;
    

`;

export const scrollPickerStyle = css`
    font-size: 30px;
    font-weight: 700;
    width: 150px;
    margin-right: 15px;
`;
