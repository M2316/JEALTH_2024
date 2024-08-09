import { css } from "@emotion/react";

export const inputGroupStyle = css`
    height: 42px;
    width: 100%;
    color: #868686;
    background: #282828;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    margin: 5px 0px;
    & svg {
        font-size: 30px;
        margin: 0px 10px;
    }
    & div > svg {
        font-size: 23px;
        margin: 0px 10px;
    }
    & input {
        width: 100%;
        height: 20px;
        font-size: 15px;
        font-weight: 500;
        background: none;
        border: none;
        outline: none;
        color: white;

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px white inset !important;
        }
    }
`;



export const inputBoxStyle = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;