import React from "react";
import navMenuIcon from "@img/nav-menu-icon.png";
import dummyUserIcon from "@img/dummy-user-icon.png";
import jealthIcon from "@img/logo/main_icons/jealth_main_icon-60x60-removebg.png";
import { css } from "@emotion/react";
import { navbarStyle, navCenterStyle, navLeftStyle, navRightStyle } from "./NavbarStyle";

const Navbar = ({logo}) => {


    let centerLogo = logo ? logo : jealthIcon;
    return (
        <div css={navbarStyle}>
            <div css={navLeftStyle}>
                <img src={navMenuIcon} alt="" height="35px" />
            </div>
            <div css={navCenterStyle}><img src={centerLogo} alt="" height="35px" /></div>
            <div css={navRightStyle}><img src={dummyUserIcon} alt="" height="35px" /></div>
        </div>
    );
};



export default Navbar;
