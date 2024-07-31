import { css } from "@emotion/react";

export const modalBaseBackgroundStyle = css`
    position: fixed;
    top: 0;
    left: 0; 
    width: 100vw;
    height: 100vh;
    background-color: #000000d1;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow-wrap: normal;
`;

export const modalBodyStyle = css`
    width: 300px;
    height: 300px;
    box-sizing: border-box;
    background: black;
    border: 5px solid gray;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

export const pickerBoxStyle = css`
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 2em;
    font-weight: 600;

    & > div:last-of-type {
        mask-image: linear-gradient(
            to top,
            transparent,
            transparent 5%,
            white 50%,
            white 50%,
            transparent 95%,
            transparent
        ) !important;
    }
`;

export const pickerLabelStyle = css`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    `;

export const pickerColumnBoxStyle = css`
    padding: 0px 10px;
    width: 50%;
`;

export const modalFooterStyle = css`

`;