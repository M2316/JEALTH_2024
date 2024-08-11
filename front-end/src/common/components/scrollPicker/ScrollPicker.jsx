import { Modal } from "@mui/material";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Picker from "react-mobile-picker";
import { pickerContainerStyle, pickerLabelStyle, scrollPickerStyle } from "./ScrollPickerStyle";
import touchVibrateUtil from "../../../utils/touchVibrateUtil";
import { v4 as uuidv4 } from "uuid";
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

const ScrollPicker = ({ type, label,onChangeHandler, valueState }) => {
    const [pickerValue, setPickerValue] = useState({});

    useEffect(()=>{
        if(!valueState)return; //빈 state 들어오면 return



        let pickerDefaultValue = {}
        if(valueState[type] < 10){ //0 ~ 9 값이면 실행
            pickerDefaultValue['firstNum'] = 0+"";
            pickerDefaultValue['secondNum'] = 0+"";
            pickerDefaultValue['thirdNum'] = Math.floor((valueState[type]) %10)+"";
            pickerDefaultValue['unit'] = valueState[`${type}Unit`];
        }else if(valueState[type] < 100){ //10 ~ 99 값이면 실행
            pickerDefaultValue['firstNum'] = 0+"";
            pickerDefaultValue['secondNum'] = Math.floor((valueState[type]) /10 % 10)+"";
            pickerDefaultValue['thirdNum'] = Math.floor((valueState[type]) %10)+"";
            pickerDefaultValue['unit'] = valueState[`${type}Unit`];
        }else if(valueState[type] < 1000){ //100 ~ 999 값이면 실행
            pickerDefaultValue['firstNum'] = Math.floor((valueState[type]) /100)+"";
            pickerDefaultValue['secondNum'] = Math.floor((valueState[type]) /10 % 10)+"";
            pickerDefaultValue['thirdNum'] = Math.floor((valueState[type]) %10)+"";
            pickerDefaultValue['unit'] = valueState[`${type}Unit`];
        }else{
            pickerDefaultValue = {
                firstNum: "0",
                secondNum: "0",
                thirdNum: "0",
                unit: selections[type][0],
            }
        }
        setPickerValue(pickerDefaultValue);
    },[])

    // picker 값이 변경되면 진동 이벤트 발생
    useEffect(()=>{
        touchVibrateUtil();
        if(type === "weight"){
            onChangeHandler({
                weight:Number(`${pickerValue['firstNum']}${pickerValue['secondNum']}${pickerValue['thirdNum']}`),
                weightUnit:pickerValue['unit']                
            });

        }else if(type === "count"){
            onChangeHandler({
                count:Number(`${pickerValue['firstNum']}${pickerValue['secondNum']}${pickerValue['thirdNum']}`),
                countUnit:pickerValue['unit']                
            });
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
                                {selections[type].map((option, idx) => (
                                    <Picker.Item
                                        key={option+uuidv4}
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
                                {selections["numbers"].map((option, idx) => (
                                    <Picker.Item
                                        key={option+uuidv4}
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
