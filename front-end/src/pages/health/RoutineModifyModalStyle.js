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
    padding-top: 15px;

    & input {
        font-size: 12px;
    }
`;

export const RoutineSearchTagStyle = css`
    padding: 0px;
    margin: 0px;
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    width: 40%;
    & li {
        padding: 2px 5px;
        margin-left: 4px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 700;
        background-color: #5bb2c0;
    }
`;

export const RoutineModifyContentStyle = css`
    margin-top: 10px;
    height: calc(100% - 140px);
    overflow: scroll;
`;

export const RoutineTitleBoxStyle = css`
    display: flex;
    justify-content: space-between;
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

export const RoutineInputBoxStyle = css`
    width: calc(100% - 70px);
    padding-left: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
`;


export const RoutineContentTagBoxStyle = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-top: 5px;
    &>ul{
        margin: 2px 0px;
    }
`;

export const RoutineTagStyle = css`
    padding: 0px;
    margin: 0px;
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    & li {
        padding: 2px 5px;
        margin-left: 4px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 700;
        background-color: #556080;
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