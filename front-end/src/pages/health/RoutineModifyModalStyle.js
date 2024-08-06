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

    height: calc(100% - 70px - 72px);
    overflow-y: scroll;
    padding: 0px 10px;

    &>div:first-of-type>div:first-of-type{
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
    &>div{
        display: flex;
        align-items: center;
        span:first-of-type{
            font-size: 16px;
        }
        span:last-of-type{
            margin-left: 5px;
            font-size: 20px;
            display: flex;
            justify-content: center;
        }
    }
    &>button{
        background-color: #5BB2C0;
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

