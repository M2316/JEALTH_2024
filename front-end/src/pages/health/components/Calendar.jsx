import React, { useEffect, useRef, useState } from "react";
import { calendarBodyStyle, calendarDateContainerStyle, calendarSubTitleStyle, calendarTitleStyle, monthStyle, yearStyle } from "./CalendarStyle";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import {motion, useAnimation} from "framer-motion";

import HealthCard from "./HealthCard";
import dayjs from "dayjs";
import calendarDate from "../../../utils/calendarDateUtil";
import CalendarDate from "./CalendarDate";

const weekName = ["Su","Mo", "Tu", "We", "Th", "Fr", "Sa"];



const Calendar = () => {

    //캘린더 swipe 애니메이션 컨트롤러
    const calendarSwipeControls = useAnimation();

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
        //렌더링 이후에 scroll 이동하기 위해 setTimeout 적용
        // setTimeout(()=>{
        //     if (scrollRef.current) {
        //         // div 요소의 전체 너비 계산 후 중간 지점으로 스크롤 설정
        //         const scrollWidth = scrollRef.current.scrollWidth;
        //         scrollRef.current.scrollLeft = (scrollWidth / 2) - (scrollRef.current.querySelector('ul').clientWidth/2);
        //       }
        // },1)
    }, [selectDate]);
    
    
    //년도 변경 이벤트
    const yearSelectorHandler = (e)=>{
        const type = e.target.dataset.btnType;

        
        
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



    //framer-motion [캘린더 swipe]
    const calendarSwipeHandle = (event, info)=>{
        if (info.offset.x > 100) {
            // 오른쪽으로 스와이프
            calendarSwipeControls.start({ x: `calc(${info.offset.x}px + 100%`, opacity: 0 },{transition:{duration:0.03}}).then(() => {
                const requestDate = dayjs(selectDate.year+"-"+selectDate.month+"-"+selectDate.date).subtract(1,'month');
                setSelectDate({
                    year:requestDate.format('YYYY'),
                    month:requestDate.format('MM'),
                    monthName:requestDate.format('MMM'),
                    date:requestDate.format('DD'),
                    day:requestDate.format("ddd")
                })
            //   setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
              calendarSwipeControls.start({ x: [-200,0], opacity: 1 });
            });
          } else if (info.offset.x < -100) {
            // 왼쪽으로 스와이프
            calendarSwipeControls.start({ x: `calc(${info.offset.x}px + -100%`, opacity: 0 },{transition:{duration:0.03}}).then(() => {
                const requestDate = dayjs(selectDate.year+"-"+selectDate.month+"-"+selectDate.date).add(1,'month');
                setSelectDate({
                    year:requestDate.format('YYYY'),
                    month:requestDate.format('MM'),
                    monthName:requestDate.format('MMM'),
                    date:requestDate.format('DD'),
                    day:requestDate.format("ddd")
                })
            //   setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
              calendarSwipeControls.start({ x: [200,0], opacity: 1 });
            });
          }else{
            calendarSwipeControls.start({ x: 0, opacity: 1 });
          }
    }

    

    return (
        <HealthCard addStyle={`width:90%;height:380px;`}>
            <div css={calendarBodyStyle}>
                <div css={calendarTitleStyle}>
                    <div css={yearStyle}>
                        <MdArrowBackIos onClick={yearSelectorHandler} data-btn-type="before"></MdArrowBackIos>
                        <span name="date-year">{selectDate.year}</span>
                        <MdArrowForwardIos onClick={yearSelectorHandler} data-btn-type="after"></MdArrowForwardIos>
                    </div>
                    <div css={monthStyle}>
                        <h1>{selectDate.month}</h1>
                        <h2>.{selectDate.monthName}</h2>
                    </div>
                </div>

                <ul css={calendarSubTitleStyle}>
                    {weekName.map((name)=><li key={ name}>{name}</li>)}
                </ul>
                <motion.div css={calendarDateContainerStyle} drag="x" animate={calendarSwipeControls} onDragEnd={calendarSwipeHandle} initial={{ x: 0, opacity: 1 }}>
                    <CalendarDate selectDate={selectDate} setSelectDate={setSelectDate} nowDate={date} renderCalendarValue={renderCalendarValue.nowMonth}></CalendarDate>
                </motion.div>                
            </div>
        </HealthCard>
    );
};

export default Calendar;
