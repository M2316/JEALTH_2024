import { css } from "@emotion/react";

export const cardStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #191a1f;
    border-radius: 15px;
    margin-bottom: 10px;
    max-width: 360px;
`;

export const titleCardStyle = css`
    h2 {
        margin: 0;
        font-size: 22px;
    }

    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #191a1f;
    border-radius: 15px;

    margin-bottom: 10px;

    & div:first-of-type {
        margin-left: 20px;
        display: flex;
        flex-direction: column;

        span {
            font-size: 11px;
            color: #969696;
            font-weight: 600;
        }
    }

    & div:last-of-type {
        margin-right: 20px;
        display: flex;
    }
`;

export const chartCardStyle = css`
    background-color: #191a1f;
    border-radius: 15px;

    padding: 15px;
    h2 {
        margin: 0;
        font-size: 22px;
    }
    span {
        font-size: 11px;
        color: #969696;
        font-weight: 600;
    }
    & div:first-of-type{
        height: 50px;
        margin-bottom: 10px;
    }
    & div:last-of-type{
        height: 100%;
        background-color: #25262A;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    display: flex;
    flex-direction: column;
    align-items: left;

    box-sizing: border-box;

    margin-bottom: 10px;
`;
