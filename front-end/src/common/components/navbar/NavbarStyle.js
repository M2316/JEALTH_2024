import { css } from "@emotion/react";
export const navbarStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #191a1f;
    position: absolute;
    top: 0;
    width: 100vw;
    height: 45px;

    .navLeftStyle,
    .navCenterStyle,
    .navRightStyle {
        width: 100%;
        background-color: red;
    }
`;
export const navLeftStyle = css`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    img{
        padding: 0px 5px;
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
