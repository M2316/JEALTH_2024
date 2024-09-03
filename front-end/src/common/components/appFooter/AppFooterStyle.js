import { css } from "@emotion/react";

const globalDividingLineStyle = import.meta.env.GLOBAL_DIVIDING_LINE_COLOR;

export const footerBtnCss = css`
    position: fixed;
    bottom: 55px;
    right: 5px;
    display: flex;
    align-items: center;
    height: 50px;
    z-index: 10;
`;

export const footerContainerCss = css`
    position: fixed;
    bottom: 55px;
    right: 25px;
    height: 50px;
    min-width: 300px;
    width: calc(100% - 25px);
    max-width: 370px;
    border: 3px solid #C6DEE2;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: #282828;
    padding-right: 25px;
`;

export const contentBoxCss = css`
display: flex;
justify-content: space-around;
align-items: center;
width: 100%;


`;
export const iconBox = css`


display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

& svg{
    height: 25px;
    width: 25px;
}
& span{
    font-size: 10px;
}
`;



export const ModalStyle = css`
    position: absolute;
    top:calc(50vh - 350px);
    left:calc(50vw - 175px);
    outline: none;
`;