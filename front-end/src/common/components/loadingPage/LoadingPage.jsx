import { css } from "@emotion/react";
import React from "react";
import jealthIcon from "@img/logo/main_icons/jealth_main_icon-60x60-removebg.png";


const LoadingPage = () => {
    return (
        <div css={bodyBackground}>
            <div className="loading">
            </div>
            <div className="loader">
                <img src={jealthIcon}/>
                <span>Loading...</span>
            </div>
        </div>
    );
};

const bodyBackground = css`
    position: fixed;
    z-index: 1000;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100vh;
    background: #000000a9;
    display: flex;
    justify-content: center;
    align-items: center;

    .loading {
            display: inline-block;
            width: 140px;
            height: 140px;
            border: 8px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top-color: #3498db;
            animation: spin 1s ease-in-out infinite;
        }
        .loader {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: calc(50% + 15px);
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 18px;
            font-weight: 600;
            span{
                margin-top: 8px;
            }
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
`;

export default LoadingPage;
