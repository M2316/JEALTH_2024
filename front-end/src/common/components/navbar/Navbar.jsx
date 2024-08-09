import React, { useState } from "react";
import navMenuIcon from "@img/nav-menu-icon.png";
import dummyUserIcon from "@img/dummy-user-icon.png";
import jealthIcon from "@img/logo/main_icons/jealth_main_icon-60x60-removebg.png";
import { css } from "@emotion/react";
import { navbarStyle, navCenterStyle, navLeftStyle, navRightStyle } from "./NavbarStyle";
import { Box, Modal } from "@mui/material";
import NavbarMenuModal from "./NavbarMenuModal";
import NavbarUserInfoModal from "./NavbarUserInfoModal";
import { useParams } from "react-router-dom";

const Navbar = ({logo}) => {

    const [menuModalFlag,setMenuModalFlag] = useState(false);
    const [userInfoModalFlag,setUserInfoModalFlag] = useState(false);


    let centerLogo = logo ? logo : jealthIcon;

    
    return (
        <div css={navbarStyle}>
            <div css={navLeftStyle} onClick={()=>setUserInfoModalFlag(true)}><img src={dummyUserIcon} alt="" height="35px" /></div>
            <div css={navCenterStyle}><img src={centerLogo} alt="" height="35px" /></div>
            <div css={navRightStyle} onClick={()=>setMenuModalFlag(true)}>
                <img src={navMenuIcon} alt="" height="35px" />
            </div>
            
            <Modal open={menuModalFlag} onClose={()=>setMenuModalFlag(false)}>
                <Box>
                    <NavbarMenuModal/>
                </Box>
            </Modal>

            <Modal open={userInfoModalFlag} onClose={()=>setUserInfoModalFlag(false)}>
                <Box>
                    <NavbarUserInfoModal/>
                </Box>
            </Modal>
        </div>
    );
};



export default Navbar;
