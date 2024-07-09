import { css } from "@emotion/react";
import React from "react";
import { cardStyle, chartCardStyle, titleCardStyle } from "./HomeCardStyle";

const Card = ({ children, type, item, addStyle, onClick}) => {
    
    const title = item?.title;
    const label = item?.label;
    const icon = item?.icon;
    const content = item?.content;




    switch (type) {
        case "titleCard":
            

            if (addStyle) {
                addStyle = css(titleCardStyle?.styles + addStyle);
            } else {
                addStyle = titleCardStyle;
            }

            return (
                <div css={addStyle} onClick={onClick}>
                    <div>
                        <h2>{title}</h2>
                        <span>{label}</span>
                    </div>
                    <div>
                        <img src={icon} width="50px" />
                    </div>
                </div>
            );
        case "chartCard":

            if (addStyle) {
                addStyle = css(chartCardStyle?.styles + addStyle);
            } else {
                addStyle = chartCardStyle;
            }

            return (
                <div css={addStyle}>
                    <div>
                        <h2>{title}</h2>
                        <span>{label}</span>
                    </div>
                    <div>
                        <h1>Chart 공간</h1>
                    </div>
                </div>
            );
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
