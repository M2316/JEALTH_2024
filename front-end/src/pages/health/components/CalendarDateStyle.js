import { css } from "@emotion/react";

export const calendarContentStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
    li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        span {
            width: 35px;
            height: 35px;
            min-width: 32px;
            min-height: 32px;
            font-weight: 600;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #282828;
            margin: 5px;
            position: relative;
        }
        &>span:first-of-type {
            color: #b63232;
        }
        &>span:last-of-type {
            color: #3442c8;
        }
        
    }
`;



export const recordedDayStyle = css`
    &::before {
        content: "";
        position: absolute;
        bottom: 5px;
        left: 15%;
        width: 70%;
        height: 2px;
        background: white;
        background-size: cover; /* 이미지를 요소 크기에 맞춤 */
        background-position: center; /* 이미지를 가운데 정렬 */
    }
`;

export const todayStyle = css`
    box-sizing: border-box;
    border: 3px solid #c6dee2;
    
`;

export const BeforeMonthDateStyle = css`
    color:#686868 !important;
`;

export const AfterMonthDateStyle = css`
    color:#686868 !important;
`;

export const NowMonthDateStyle = css`
    color:white;
`;
