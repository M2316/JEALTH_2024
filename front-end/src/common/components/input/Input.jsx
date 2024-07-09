import { css } from "@emotion/react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { GrContactInfo } from "react-icons/gr";
import { ImCheckmark2 } from "react-icons/im";
import { IoMdCloseCircle } from "react-icons/io";
import { inputGroupStyle } from "./InputStyle";



const Input = ({
  inputIcon,
  valueType,
  inputChangeHandler,
  inputClearHandler,
  inputState,
  placeholder,
  name,
  addStyle
}) => {
  

  const InputIcon = () => {
    switch (inputIcon) {
      case "user":
        return <AiOutlineUser />;
      case "lock":
        return <CiLock />;
      case "check":
        return <ImCheckmark2 />;
      case "info":
        return <GrContactInfo />;
    }
  };

  if (addStyle) {
    addStyle = css(inputGroupStyle.styles + addStyle);
} else {
    addStyle = inputGroupStyle;
}

  return (
    <div css={addStyle}>
      <InputIcon />
      <input
        type={valueType}
        onChange={inputChangeHandler}
        value={inputState || ""}
        placeholder={placeholder}
        name={name}
      />
      {inputState && (
        <IoMdCloseCircle
          onClick={(e) => {
            e.stopPropagation();
            inputClearHandler(e);
          }}
        />
      )}
    </div>
  );
};

export default Input;
