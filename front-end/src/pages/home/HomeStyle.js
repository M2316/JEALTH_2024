import { css } from "@emotion/react";

const backgroundBaseColor = import.meta.env.BACKGRUOND_BASE_COLOR;

export const homePageBodyStyle = css`
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 70px;
    background-color: ${backgroundBaseColor};
`;
