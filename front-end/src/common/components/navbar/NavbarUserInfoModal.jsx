import React from 'react'
import { css } from "@emotion/react";
import mypageIcon from '@img/sports/mypage-white.png';
import logoutIcon from '@img/sports/logout-white.png';
import { iconBoxStyle, modalBodyStyle } from './NavbarUserInfoModalStyle';

const NavbarMenuModal = () => {
  return (
    <div css={modalBodyStyle}>
        <ul>
            <li>
                <span>My Page</span>
                <div css={iconBoxStyle}>
                    <img src={mypageIcon}/>
                </div>
            </li>
            <li>
                <span>Logout</span>
                <div css={iconBoxStyle}>
                    <img src={logoutIcon}/>
                </div>
            </li>
            
        </ul>
    </div>
  )
}

export default NavbarMenuModal