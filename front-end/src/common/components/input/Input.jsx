import { css } from "@emotion/react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { GrContactInfo } from "react-icons/gr";
import { ImCheckmark2 } from "react-icons/im";
import { IoMdCloseCircle } from "react-icons/io";
import { inputGroupStyle, inputBoxStyle } from "./InputStyle";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Input = ({
    inputIcon,
    valueType,
    inputChangeHandler,
    inputClearHandler,
    inputState,
    placeholder,
    name,
    addStyle,
    inputBlurHandler,
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
            case "magnify":
                return <FaMagnifyingGlass />;
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
            <div css={inputBoxStyle}>
                <input
                    type={valueType}
                    onChange={inputChangeHandler}
                    value={inputState || ""}
                    placeholder={placeholder}
                    name={name}
                    onBlur={inputBlurHandler}
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
        </div>
    );
};

export default Input;
