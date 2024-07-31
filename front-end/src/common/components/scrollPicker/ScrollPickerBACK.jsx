import { Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Picker from "react-mobile-picker";
import {
    modalBaseBackgroundStyle,
    modalBodyStyle,
    modalFooterStyle,
    pickerBoxStyle,
    pickerColumnBoxStyle,
    pickerLabelStyle,
} from "./ScrollPickerStyleBACK";
import Button from "../button/Button";

const selections = {
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    unit: ["g", "Kg", "lb", "Once"],
    time_h: () => {
        const list = [];
        for (let i = 0; i < 24; i++) list.push(i + 1);
        return list;
    },
    time_m: () => {
        const list = [];
        for (let i = 0; i < 60; i++) list.push(i + 1);
        return list;
    },
};

// 0. modal body 외부를 클릭하면 modal close 수행
// 1. 무한스크롤이 될 수 있도록 로직 수정하기
// 2. 넘겨져온 type별로 picker가 modal에 set될 수 있도록 수정하기
const ScrollPicker = ({ isOpen, onClose, targetState,setTargetState, pickerTypes}) => {
    const [pickerValue, setPickerValue] = useState("");

    const [pickerScrollStyle, setPickerScrollStyle] = useState("");

    const pageCloseHandler = (e) => {
        if (e.target !== e.currentTarget) return;
        onClose();
    };

    const pickerScrollHandler = (e) => {
        if (
          e.currentTarget.getAttribute("style") !== pickerScrollStyle
        ) {
            setPickerScrollStyle(e.currentTarget.getAttribute("style"));
        }
    };

    useEffect(() => {
        if (
          "" !== pickerScrollStyle &&
            window.matchMedia("(display-mode: standalone)").matches ||
            window.navigator.standalone === true
        ) {
            window.navigator.vibrate([60]);
        }
    }, [pickerScrollStyle]);

    if (isOpen) {
        return (
            <div
                name="modalBackground"
                css={modalBaseBackgroundStyle}
                onClick={pageCloseHandler}
            >
                <div css={modalBodyStyle}>
                    <div css={pickerBoxStyle} name="pickerbody">
                        <span css={pickerLabelStyle}>무게</span>
                        <Picker
                            value={pickerValue}
                            onChange={(value) => {
                                setPickerValue({
                                    ...pickerValue,
                                    ...value,
                                });
                            }}
                            wheelMode="natural"
                            height={100}
                        >
                            <Picker.Column
                                onWheel={pickerScrollHandler}
                                onTouchMove={pickerScrollHandler}
                                className="test"
                                name="numbers1"
                                css={pickerColumnBoxStyle}
                            >
                                {selections["numbers"].map((option) => (
                                    <Picker.Item key={option} value={option}>
                                        {option}
                                    </Picker.Item>
                                ))}
                            </Picker.Column>
                            <Picker.Column
                                onWheel={pickerScrollHandler}
                                onTouchMove={pickerScrollHandler}
                                name="numbers2"
                                css={pickerColumnBoxStyle}
                            >
                                {selections["numbers"].map((option) => (
                                    <Picker.Item key={option} value={option}>
                                        {option}
                                    </Picker.Item>
                                ))}
                            </Picker.Column>
                            <Picker.Column
                                onWheel={pickerScrollHandler}
                                onTouchMove={pickerScrollHandler}
                                name="numbers3"
                                css={pickerColumnBoxStyle}
                            >
                                {selections["numbers"].map((option) => (
                                    <Picker.Item key={option} value={option}>
                                        {option}
                                    </Picker.Item>
                                ))}
                            </Picker.Column>
                        </Picker>
                    </div>
                    <div css={pickerBoxStyle}>
                        <span css={pickerLabelStyle}>횟수</span>
                        <Picker
                            value={pickerValue}
                            onChange={(value) => {
                                setPickerValue({
                                    ...pickerValue,
                                    ...value,
                                });
                            }}
                            wheelMode="natural"
                            height={100}
                        >
                            <Picker.Column
                                onWheel={pickerScrollHandler}
                                onTouchMove={pickerScrollHandler}
                                className="test"
                                name="numbers1"
                                css={pickerColumnBoxStyle}
                            >
                                {selections["numbers"].map((option) => (
                                    <Picker.Item key={option} value={option}>
                                        {option}
                                    </Picker.Item>
                                ))}
                            </Picker.Column>
                            <Picker.Column
                                onWheel={pickerScrollHandler}
                                onTouchMove={pickerScrollHandler}
                                name="numbers2"
                                css={pickerColumnBoxStyle}
                            >
                                {selections["numbers"].map((option) => (
                                    <Picker.Item key={option} value={option}>
                                        {option}
                                    </Picker.Item>
                                ))}
                            </Picker.Column>
                        </Picker>
                    </div>
                    <div css={modalFooterStyle}>
                        <Button
                            btnTheme="middle-size"
                            addStyle={{ width: "100px" }}
                        >
                            OK
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
};

export default ScrollPicker;
