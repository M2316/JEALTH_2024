import { css } from "@emotion/react";

export const RoutineModifyContainerStyle = css`
    width: 350px;
    height: 700px;
    box-sizing: border-box;
    background-color: #3d3d3f;
    border-radius: 15px;
    padding: 0px 15px;
`;

export const RoutineModifyTitleStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0px 5px 0px;

    & input {
        font-size: 12px !important;
    }
`;

export const RoutineSearchTagStyle = css`
    
    display: flex;
    justify-content: space-evenly;
    width: 40%;
    position: relative;
    height: 42px;
    
    & ul{
        padding: 0px;
        margin: 0px;
        list-style: none;
        width: 100%;
        top: calc(21px - 10px);
        display: flex;
        align-content: space-between;
        flex-direction: column;
        position: absolute;
        z-index: 100;
        &:first-of-type{
            width: 48px;
            left: 3px;
            
        }
        &:last-of-type{
            left: 53px;
            width: 80px;
            
        }
        li{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2px;
            margin-left: 4px;
            margin-bottom: 4px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 700;
            background-color: #5bb2c0;
            
        }
    }
`;

export const RoutineModifyContentWrapStyle = css`
    height: calc(100% - 70px - 72px);
    justify-content: center;
    display: flex;
    flex-direction: column;

`;

export const RoutineModifyContentStyle = css`
    overflow-y: scroll;
    padding: 0px 10px;
    

    & > div:first-of-type > div:first-of-type {
        margin-top: 10px;
    }
`;

export const routineCardContainerStyle = css`
`;

export const routineCardTopTapStyle = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    margin: 20px 0px 10px 0px;
    box-sizing: border-box;
    & > div {
        display: flex;
        align-items: center;
        margin-left: auto;

        span:first-of-type {
            font-size: 16px;
        }
        span:last-of-type {
            margin-left: 5px;
            font-size: 20px;
            display: flex;
            justify-content: center;
        }
    }
    & > button {
        background-color: #5bb2c0;
        color: white;
        outline: none;
        border: none;
        border-radius: 15px;
        width: 100px;
        height: 30px;
        font-weight: 800;
        font-size: 16px;
    }
`;

export const cardWrapStyle = css`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const RoutineModalOkButStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;

    & button {
        border: none;
        width: 140px;
        height: 50px;
        font-size: 25px;
        font-weight: 700;
        color: #fff;
        background-color: #5bb2c0;
        border-radius: 10px;
        box-shadow: 4px 4px 4px #323232;
    }
`;

export const alertDialogBoxStyle = css`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const alertDialogStyle = css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 20px;
    font-size: 14px;
    background-color: #7b94f1;
    border-radius: 15px;
    font-weight: 700;
    top: 0;
    span {
        display: flex;
        align-items: center;
        margin-left: 5px;
    }
    svg {
        font-size: 16px;
    }
`;
