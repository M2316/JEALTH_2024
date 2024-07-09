import { css } from "@emotion/react";

import checkIcon from "@img/check-icon-3.png";

export const healthPageBodyStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 60px;

    h1,
    h2,
    h3 {
        margin: 0;
    }

    ul {
        padding: 0;
        margin: 0;
    }
    li {
        list-style: none;
        list-style-type: none;
    }
`;

export const calendarBodyStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 15px 30px;
    box-sizing: border-box;
`;

export const calendarTitleStyle = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const calendarSubTitleStyle = css`
    /* 리스트 기본 스타일 초기화 */

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        margin: 5px;
        font-size: 14px;
        font-weight: 700;
    }
`;

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
        }
    }
`;

export const yearStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
`;
export const monthStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
        margin-top: 7px;
    }
`;

export const selectedDayStyle = css`
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: -20px;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${checkIcon}); /* 이미지 경로 */
        background-size: cover; /* 이미지를 요소 크기에 맞춤 */
        background-position: center; /* 이미지를 가운데 정렬 */
    }
`;

export const todayStyle = css`
    box-sizing: border-box;
    border: 3px solid #c6dee2;
`;

export const recordedDayStyle = css`
    position: relative;
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
