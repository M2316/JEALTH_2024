import { css } from "@emotion/react";
import React from "react";
import plusIcon from "@img/plus-icon.png";
import { RiMenuAddFill } from "react-icons/ri";
import { MdOutlineConstruction } from "react-icons/md";
import { navbarStyle, navCenterStyle, navLeftStyle, navRightStyle ,footerBtnBoxStyle} from "../appFooter/AppFooterStyle";



const AppFooter = () => {
    return (
        <div css={navbarStyle}>
            <div css={navLeftStyle}>
                <div css={footerBtnBoxStyle}>
                    <RiMenuAddFill></RiMenuAddFill>
                    <span>루틴목록</span>
                </div>
                <div css={footerBtnBoxStyle}>
                    <MdOutlineConstruction></MdOutlineConstruction>
                    <span>개발중...</span>
                </div>
            </div>
            <div css={navCenterStyle}>
                <img src={plusIcon} width="50px" />
            </div>
            <div css={navRightStyle}>
                <div css={footerBtnBoxStyle}>
                    <MdOutlineConstruction></MdOutlineConstruction>
                    <span>개발중...</span>
                </div>
                <div css={footerBtnBoxStyle}>
                    <MdOutlineConstruction></MdOutlineConstruction>
                    <span>개발중...</span>
                </div>
            </div>
        </div>
    );
};

export default AppFooter;
