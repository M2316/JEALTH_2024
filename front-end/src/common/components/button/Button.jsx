import { css } from "@emotion/react";
import React from "react";

const defaultBtnStyle = {
  border: "none",
  borderRadius: "10px",
  background: "none",
  width: "100%",
  [":hover"]: {
    cursor: "pointer",
  },
  wordBreak:"keep-all"
};

const Button = ({ type,onClick, btnTheme, children , addStyle, readOnly}) => {
  const buttonStyle = () => {


    switch (btnTheme) {
      case "middle-size":
        return css({
          ...defaultBtnStyle,
          color: "white",
          width:"30%",
          background: "#5BB2C0",
          height: "42px",
          margin: "5px 0px",
          fontSize: "15px",
          fontWeight: "800",
        })
      case "login":
      case "join":
      case "passwordChange":
        return css({
          ...defaultBtnStyle,
          ...addStyle,
          color: "white",
          background: "#5BB2C0",
          height: "42px",
          margin: "5px 0px",
          fontSize: "21px",
          fontWeight: "800",
        });
        case "authenticationCheck":
          return css({
            ...defaultBtnStyle,
          ...addStyle,
          color: "white",
          background: "#5BB2C0",
          height: "42px",
          margin: "5px 0px",
          fontSize: "21px",
          fontWeight: "800",
          });
      case "linkText":
        return css({
          ...defaultBtnStyle,
          ...addStyle,
          color: "#5BB2C0",
          height: "32px",
          marginBottom: "5px",
          [":hover"]: {
            textDecoration: "underline",
          },
        });
      case "kakaoLogin":
        return css({
          ...defaultBtnStyle,
          ...addStyle,
        });
      case "naverLogin":
        return css({
          ...defaultBtnStyle,
          ...addStyle,
        });
      case "googleLogin":
        return css({
          ...defaultBtnStyle,
          ...addStyle,
        });
    }
  };
  return (
    <>
      <button type={type || "button"} css={buttonStyle} onClick={onClick} disabled={readOnly}>
        {children}
      </button>
    </>
  );
};

export default Button;
