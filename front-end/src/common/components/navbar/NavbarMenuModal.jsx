import React from "react";
import { css } from "@emotion/react";
import {
    bottomBtnBoxStyle,
    iconBoxStyle,
    modalBodyStyle,
    navBottomBtnStyle,
} from "./NavbarMenuModalStyle";
import homeIcon from "@img/sports/home-white.png";
import healthIcon from "@img/sports/health-white.png";
import runningIcon from "@img/sports/running-white.png";
import boulderingIcon from "@img/sports/bouldering-white.png";
import rankingIcon from "@img/sports/ranking-white.png";
import crossfitIcon from "@img/sports/crossfit-white.png";
import chartIcon from "@img/sports/chart-white.png";
import chatIcon from "@img/sports/chat-white.png";
import dummyUserIcon from "@img/dummy-user-icon.png";
import exitIcon from "@img/exit-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutQuery } from "../../../hooks/useUserHook";

const NavbarMenuModal = () => {
    const { data, isLoding, isError, error, refetch, isSuccess } =
        useLogoutQuery();

    const navigate = useNavigate();

    const logoutRequestHandler = () => {
        refetch();
        setTimeout(() => {
            navigate("/login");
        }, 0);
    };

    return (
        <div css={modalBodyStyle}>
            <ul>
                <li>
                    <Link to="/">
                        <span>Home</span>
                        <div css={iconBoxStyle}>
                            <img src={homeIcon} />
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/app/health">
                        <span>Health</span>
                        <div css={iconBoxStyle}>
                            <img src={healthIcon} />
                        </div>
                    </Link>
                </li>
                <li>
                    <Link>
                        <span>Running</span>
                        <div css={iconBoxStyle}>
                            <img src={runningIcon} />
                        </div>
                    </Link>
                </li>
                <li>
                    <Link>
                        <span>Bouldering</span>
                        <div css={iconBoxStyle}>
                            <img src={boulderingIcon} />
                        </div>
                    </Link>
                </li>
                <li>
                    <Link>
                        <span>Ranking</span>
                        <div css={iconBoxStyle}>
                            <img src={rankingIcon} />
                        </div>
                    </Link>
                </li>
                <li>
                    <Link>
                        <span>Workout Of Day</span>
                        <div css={iconBoxStyle}>
                            <img src={crossfitIcon} />
                        </div>
                    </Link>
                </li>
                <li>
                    <Link>
                        <span>Chart</span>
                        <div css={iconBoxStyle}>
                            <img src={chartIcon} />
                        </div>
                    </Link>
                </li>
                <li>
                    <Link>
                        <span>Lobby Chat</span>
                        <div css={iconBoxStyle}>
                            <img src={chatIcon} />
                        </div>
                    </Link>
                </li>
            </ul>
            <ul css={bottomBtnBoxStyle}>
                <li>
                    <button css={navBottomBtnStyle}>
                        <img src={dummyUserIcon} />
                        <span>MY PAGE</span>
                    </button>
                </li>
                <li>
                    <button
                        css={navBottomBtnStyle}
                        onClick={logoutRequestHandler}
                    >
                        <img src={exitIcon} />
                        <span>LOGOUT</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default NavbarMenuModal;
