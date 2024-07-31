import { css } from "@emotion/react";

export const RoutineListContainerStyle = css`
    width: 350px;
    height: 700px;

    background-color: #3d3d3f;
    border-radius: 15px;
`;
export const RoutineListTitleStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    & h1 {
        margin: 15px 0px;
    }
`;
export const RoutineModalContentStyle = css`
    padding: 0px 15px;
    width: 100%;
    height: calc(700px - 73px - 73px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
`;

export const RoutineImgBoxStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    background-color: #a1a1a1;
    border-radius: 15px;
    & > svg {
        width: 40px;
        height: 40px;
    }
`;

export const RoutineInfoStyle = css`
    margin-left: 15px;
    margin-right: 10px;
    width: calc(100% - 95px);
    display: flex;
    flex-direction: column;
`;

export const RoutineTagStyle = css`
    padding: 0px;
    margin: 0px;
    list-style: none;
    display: flex;
    justify-content: end;
    width: 100%;
    & li {
        padding: 2px 5px;
        margin-left: 4px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 700;
        background-color: #5bb2c0;
    }
`;

export const RoutineNameStyle = css`
    font-size: 17px;
    margin: 2px 0px;
    font-weight: 700;
`;

export const RoutineSaveInfoStyle = css`
    font-size: 7px;
    color: #5bb2c0;
    display: flex;
    align-items: center;
    & span:first-of-type {
        margin-right: 20px;
    }
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
