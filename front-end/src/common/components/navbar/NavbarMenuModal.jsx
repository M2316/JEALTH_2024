import React from "react";
import { css } from "@emotion/react";
import { iconBoxStyle, modalBodyStyle } from "./NavbarMenuModalStyle";
import homeIcon from "@img/sports/home-white.png";
import healthIcon from "@img/sports/health-white.png";
import runningIcon from "@img/sports/running-white.png";
import boulderingIcon from "@img/sports/bouldering-white.png";
import rankingIcon from "@img/sports/ranking-white.png";
import crossfitIcon from "@img/sports/crossfit-white.png";
import chartIcon from "@img/sports/chart-white.png";
import chatIcon from "@img/sports/chat-white.png";
import { Link } from "react-router-dom";

const NavbarMenuModal = () => {
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
        </div>
    );
};

export default NavbarMenuModal;
