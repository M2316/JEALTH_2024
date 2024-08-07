import { css } from "@emotion/react";



export const calendarBodyStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 15px 20px;
    box-sizing: border-box;
    overflow-x:hidden;
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


export const yearStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    height: 30px;
    &>span{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 20px;
        font-weight: 600;
    }
    &>svg{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        margin: 0px 4px;
        scale: 2.1;
    }
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
    position: absolute;
    width: 30px;
    height: 30px;
    top: -15px;


`;


export const calendarDateContainerStyle = css`
    display: flex;
    width: 100%;
`;



