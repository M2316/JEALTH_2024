import React, { useEffect, useRef, useState } from "react";
import { calendarBodyStyle, calendarDateContainerStyle, calendarSubTitleStyle, calendarTitleStyle, monthStyle, yearStyle } from "./CalendarStyle";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import {motion, useAnimation} from "framer-motion";

import HealthCard from "./HealthCard";
import dayjs from "dayjs";
import calendarDate from "../../../utils/calendarDateUtil";
import CalendarDate from "./CalendarDate";
import { useDispatch } from "react-redux";
import { selectedDateCahnge } from "../../../redux/reducers/calendarSlice";
import touchVibrateUtil from "../../../utils/touchVibrateUtil";
import { duration } from "@mui/material";

const weekName = ["Su","Mo", "Tu", "We", "Th", "Fr", "Sa"];



const Calendar = () => {

    //redux to State AND dispatch
    const dispatch = useDispatch();


    //캘린더에 들어갈 DATE 객체
    const [renderCalendarValue, setRenderCalendarValue] = useState({});


    //선택 일 state
    const date = dayjs();
    const [selectDate,setSelectDate] = useState({
        year:date.format('YYYY'),
        month:date.format('MM'),
        monthName:date.format('MMM'),
        date:date.format('DD'),
        day:date.format("ddd")
    });

    useEffect(() => {
        let requestDate = dayjs(selectDate.year + "-" + selectDate.month + "-" + selectDate.date);
        setRenderCalendarValue({
            beforeMonth:calendarDate(requestDate.subtract(1,'month').format("YYYY-MM-DD")),
            nowMonth:calendarDate(requestDate.format("YYYY-MM-DD")),
            afterMonth:calendarDate(requestDate.add(1,'month').format("YYYY-MM-DD")),            
        });
        dispatch(selectedDateCahnge(selectDate.year + "-" + selectDate.month + "-" + selectDate.date));


    }, [selectDate]);
    
    
    //년도 변경 이벤트
    const yearSelectorHandler = (type)=>{
        // const type = e.target.dataset.btnType;
        touchVibrateUtil([50,0,100,0,50,0,100])
        
        if(type === "before"){
            const requestDate = dayjs(selectDate.year+"-"+selectDate.month+"-"+selectDate.date).subtract(1,'year');
            setSelectDate({
                year:requestDate.format('YYYY'),
                month:requestDate.format('MM'),
                monthName:requestDate.format('MMM'),
                date:requestDate.format('DD'),
                day:requestDate.format("ddd")
            })
        }else if(type === "after"){
            const requestDate = dayjs(selectDate.year+"-"+selectDate.month+"-"+selectDate.date).add(1,'year');
            setSelectDate({
                year:requestDate.format('YYYY'),
                month:requestDate.format('MM'),
                monthName:requestDate.format('MMM'),
                date:requestDate.format('DD'),
                day:requestDate.format("ddd")
            })
        }
    }



    

    //애니메이션 관련 코드 start ================================================================================

    //캘린더 swipe 애니메이션 컨트롤러
    const calendarSwipeControls = useAnimation();

    const yearAnimateControls = useAnimation();
    const monthAnimateControls = useAnimation();

    const yearTextAnimation = (type)=>{
        switch(type){
            case "before":
                yearAnimateControls.start({x:[0,-20],opacity:0},{transition:{duration:0.05}}).then(()=>{
                    yearSelectorHandler(type);
                    yearAnimateControls.start({x:[20,0],opacity:1},{transition:{duration:0.05}});
                });                
                break;

            case "after":
                yearAnimateControls.start({x:[0,20],opacity:0},{transition:{duration:0.05}}).then(()=>{
                    yearSelectorHandler(type);
                    yearAnimateControls.start({x:[-20,0],opacity:1},{transition:{duration:0.05}});
                });                
                break;
        }
    }


    //framer-motion [캘린더 swipe]
    const calendarSwipeHandle = (event, info)=>{
        if (info.offset.x > 100) {
            // 오른쪽으로 스와이프
            touchVibrateUtil([200])
            calendarSwipeControls.start({ x: `calc(${info.offset.x}px + 100%`, opacity: 0 },{transition:{duration:0.03}})
            .then(()=>{
                monthAnimateControls.start({y:[20,0],opacity:[0,1]},{transition:0.1});
            })
            .then(() => {          
                
                const requestDate = dayjs(selectDate.year+"-"+selectDate.month+"-"+selectDate.date).subtract(1,'month');
                setSelectDate({
                    year:requestDate.format('YYYY'),
                    month:requestDate.format('MM'),
                    monthName:requestDate.format('MMM'),
                    date:requestDate.format('DD'),
                    day:requestDate.format("ddd")
                })
                calendarSwipeControls.start({ x: [-200,0], opacity: 1 });
                
            })
        } else if (info.offset.x < -100) {
            // 왼쪽으로 스와이프
            touchVibrateUtil([200])
            calendarSwipeControls.start({ x: `calc(${info.offset.x}px + -100%`, opacity: 0 },{transition:{duration:0.03}}).then(()=>{
                monthAnimateControls.start({y:[-20,0],opacity:[0,1]},{transition:0.1});
            }).then(() => {
                const requestDate = dayjs(selectDate.year+"-"+selectDate.month+"-"+selectDate.date).add(1,'month');
                setSelectDate({
                    year:requestDate.format('YYYY'),
                    month:requestDate.format('MM'),
                    monthName:requestDate.format('MMM'),
                    date:requestDate.format('DD'),
                    day:requestDate.format("ddd")
                })
            calendarSwipeControls.start({ x: [200,0], opacity: 1 });
            });
        }else{
            calendarSwipeControls.start({ x: 0, opacity: 1 });
        }
    }
    //애니메이션 관련 코드 end ================================================================================

    return (
        <HealthCard addStyle={`width:90%;height:380px;`}>
            <div css={calendarBodyStyle}>
                <div css={calendarTitleStyle}>
                    <div css={yearStyle}>
                        <MdKeyboardArrowLeft  onClick={()=>yearTextAnimation("before")} ></MdKeyboardArrowLeft >
                        <motion.span animate={yearAnimateControls} name="date-year">{selectDate.year}</motion.span>
                        <MdKeyboardArrowRight  onClick={()=>yearTextAnimation("after")}></MdKeyboardArrowRight >
                    </div>
                    <motion.div animate={monthAnimateControls} css={monthStyle}>
                        <h1>{selectDate.month}</h1>
                        <h2>.{selectDate.monthName}</h2>
                    </motion.div>
                </div>

                <ul css={calendarSubTitleStyle}>
                    {weekName.map((name)=><li key={ name}>{name}</li>)}
                </ul>
                <motion.div css={calendarDateContainerStyle} drag="x" animate={calendarSwipeControls} onDragEnd={calendarSwipeHandle} initial={{ x: 0, opacity: 1 }}>
                    <CalendarDate monthAnimateControls={monthAnimateControls} selectDate={selectDate} setSelectDate={setSelectDate} nowDate={date} renderCalendarValue={renderCalendarValue.nowMonth}></CalendarDate>
                </motion.div>                
            </div>
        </HealthCard>
    );
};

export default Calendar;
