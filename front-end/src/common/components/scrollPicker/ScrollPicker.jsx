import { Modal } from "@mui/material";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Picker from "react-mobile-picker";
import { pickerContainerStyle, pickerLabelStyle, scrollPickerStyle } from "./ScrollPickerStyle";

const selections = {
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    weight: ["Kg","g","lb", "Once"],
    count:["회"],
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

const ScrollPicker = ({ type, label }) => {
    const [pickerValue, setPickerValue] = useState({
        firstNum: "0",
        secondNum: "0",
        thirdNum: "0",
        unit: type,
    });


    // picker 값이 변경되면 진동 이벤트 발생
    useEffect(()=>{
        if (
              window.matchMedia("(display-mode: standalone)").matches ||
              window.navigator.standalone === true
          ) {
              window.navigator.vibrate([60]);
          }
    },[pickerValue]);

    return (
        <div css={pickerContainerStyle}>
            <div css={pickerLabelStyle}>
                <span>{label}</span>
            </div>
            <Picker
                value={pickerValue}
                onChange={(value)=>{setPickerValue(value)}}
                css={scrollPickerStyle}
                height={100}
                itemHeight={45}
                wheelMode="natural"
            >
                {Object.keys(pickerValue).map((name) => {
                    if (name === "unit") {
                        return (
                            <Picker.Column key={name} name={name}>
                                {selections[type].map((option) => (
                                    <Picker.Item
                                        key={name + option}
                                        value={option}
                                    >
                                        {option}
                                    </Picker.Item>
                                ))}
                            </Picker.Column>
                        );
                    } else {
                        return (
                            <Picker.Column key={name} name={name}>
                                {selections["numbers"].map((option) => (
                                    <Picker.Item
                                        key={name + option}
                                        value={option}
                                    >
                                        {option}
                                    </Picker.Item>
                                ))}
                            </Picker.Column>
                        );
                    }
                })}
            </Picker>
        </div>
    );
};

export default ScrollPicker;
