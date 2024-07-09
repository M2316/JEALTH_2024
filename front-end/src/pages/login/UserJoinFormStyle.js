import { css } from "@emotion/react";

export const contentBoxCss = css`
    background: #191a1f;
    width: 100%;
    height: 80%;
    position: absolute;
    bottom: 0;
    border-radius: 20px 20px 0px 0px;
    outline: none;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const titleCss = css`
    h2 {
        margin-top: 15px;
        margin-bottom: 5px;
    }
`;

export const inputGroupCss = css`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    button {
        position: absolute;
        bottom: 15px;
    }
`;