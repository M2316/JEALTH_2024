import { css } from "@emotion/react";
import React from "react";
import plusIcon from "@img/plus-icon.png";

const AppFooter = () => {
    return (
        <div css={navbarStyle}>
            <div css={navLeftStyle}>
                <span>test</span>
            </div>
            <div css={navCenterStyle}>
                <div>
                    <img src={plusIcon} width="65px" />
                </div>
            </div>
            <div css={navRightStyle}>ddsss</div>
        </div>
    );
};
const navbarStyle = css`
    position: absolute;
    bottom: 0;
    height: 60px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #282828;
    border-radius: 20px 20px 0 0;
`;
const navLeftStyle = css``;
const navCenterStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    margin-bottom: 25px;
    &>div{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #282828;
        border-radius: 100px;
        
    }
`;
const navRightStyle = css``;
export default AppFooter;
