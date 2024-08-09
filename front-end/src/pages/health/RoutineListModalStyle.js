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

export const RoutineGroupStyle = css`
    width: 100%;
`;

export const RoutineCardTopTapStyle = css`
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
        margin-left: auto;
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
`;
export const RoutineCardContainerStyle = css`

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
