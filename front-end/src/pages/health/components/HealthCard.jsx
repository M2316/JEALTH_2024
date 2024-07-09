import { css } from "@emotion/react";
import React from "react";
import { cardStyle, chartCardStyle, titleCardStyle } from "./HealthCardStyle";

const Card = ({ children, type, item, addStyle, onClick}) => {
    const title = item?.title;
    const label = item?.label;
    const icon = item?.icon;
    const content = item?.content;
    switch (type) {
        
        default:
            if (addStyle) {
                addStyle = css(cardStyle.styles + addStyle);
            } else {
                addStyle = cardStyle;
            }
            return <div css={addStyle}>{children}</div>;
    }
};

export default Card;
