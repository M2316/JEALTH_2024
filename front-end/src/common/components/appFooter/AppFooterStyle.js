import { css } from "@emotion/react";

const globalDividingLineStyle = import.meta.env.GLOBAL_DIVIDING_LINE_COLOR;

export const navbarStyle = css`
    position: fixed;
    bottom: 0;
    height: 60px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #282828;
    border-top: 3px solid #646464;
`;
export const navLeftStyle = css`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;
export const navCenterStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
`;
export const navRightStyle = css`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

export const footerBtnBoxStyle = css`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > svg:first-of-type {
        font-size: 2em;
    }
    span {
        font-size: 12px;
    }
`;