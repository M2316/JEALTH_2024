import { css } from "@emotion/react";
export const navbarStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #191a1f;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 45px;
    z-index: 100;

    .navLeftStyle,
    .navCenterStyle,
    .navRightStyle {
        width: 100%;
        background-color: #191a1f;
    }
`;
export const navLeftStyle = css`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 2em;
    svg{
        padding-left: 20px;
    }
`;
export const navCenterStyle = css`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
`;
export const navRightStyle = css`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    img{
        padding-right: 20px;
    }
`;
