import React, { useEffect, useState } from "react";
import {
    AfterMonthDateStyle,
    BeforeMonthDateStyle,
    calendarContentStyle,
    recordedDayStyle,
    todayStyle,
} from "./CalendarDateStyle";
import calendarDate from "../../../utils/calendarDateUtil";
import dayjs from "dayjs";
import { selectedDayStyle } from "./CalendarStyle";
import checkIcon from "@img/check-icon-3.png";

const CalendarDate = ({ type, selectDate, setSelectDate, nowDate, renderCalendarValue}) => {

    

    

    //선택 일 변경
    const selectDateChangeHandler = (e) => {
        if (
            e.target.tagName === "IMG" ||
            selectDate.date === e.target.dataset.date
        ) {
            return;
        }
        e.stopPropagation();
        setSelectDate({
            ...selectDate,
            month: e.target.dataset.month,
            year: e.target.dataset.year,
            date: e.target.dataset.date,
            day: e.target.dataset.day,
        });
    };

    //다음 달 일 선택
    const afterMonthSelectHandler = (e) => {
        const afterMonthDate = dayjs(
            selectDate.year +
                "-" +
                selectDate.month +
                "-" +
                e.target.dataset.date
        ).add(1, "month");

        setSelectDate({
            year: afterMonthDate.format("YYYY"),
            month: afterMonthDate.format("MM"),
            monthName: afterMonthDate.format("MMM"),
            date: afterMonthDate.format("DD"),
            day: afterMonthDate.format("ddd"),
        });
    };

    //전 달 일 선택
    const beforeMonthSelectHandler = (e) => {
        const beforeMonthDate = dayjs(
            selectDate.year + "-" + selectDate.month + "-" + "01"
        )
            .subtract(1, "month")
            .date(e.target.dataset.date);

        setSelectDate({
            year: beforeMonthDate.format("YYYY"),
            month: beforeMonthDate.format("MM"),
            monthName: beforeMonthDate.format("MMM"),
            date: beforeMonthDate.format("DD"),
            day: beforeMonthDate.format("ddd"),
        });
    };

    return (
        <ul css={calendarContentStyle}>
            {renderCalendarValue &&
                renderCalendarValue.weeklyDivision.map((week, idxA) => (
                    <li key={idxA + "week"}>
                        {week.map((item) => {
                            switch (item.type) {
                                case "beforeMonth":
                                    return (
                                        <span
                                            key={item.type + item.date}
                                            css={BeforeMonthDateStyle}
                                            onClick={beforeMonthSelectHandler}
                                            data-year={
                                                renderCalendarValue.nowYear
                                            }
                                            data-month={
                                                renderCalendarValue.nowMonth
                                            }
                                            data-date={item.date}
                                            data-day={item.day}
                                        >
                                            {item.date}
                                        </span>
                                    );
                                case "afterMonth":
                                    return (
                                        <span
                                            key={item.type + item.date}
                                            css={AfterMonthDateStyle}
                                            onClick={afterMonthSelectHandler}
                                            data-year={
                                                renderCalendarValue.nowYear
                                            }
                                            data-month={
                                                renderCalendarValue.nowMonth
                                            }
                                            data-date={item.date}
                                            data-day={item.day}
                                        >
                                            {item.date}
                                        </span>
                                    );
                                case "nowMonth":
                                    return (
                                        <span
                                            key={item.type + item.date}
                                            css={[
                                                item.date ===
                                                    nowDate.format("DD") &&
                                                    selectDate.month ===
                                                        nowDate.format("MM") &&
                                                    selectDate.year ===
                                                        nowDate.format(
                                                            "YYYY"
                                                        ) &&
                                                    todayStyle,
                                                recordedDayStyle, // 저장된 데이터 있으면 표시
                                            ]}
                                            data-year={
                                                renderCalendarValue.nowYear
                                            }
                                            data-month={
                                                renderCalendarValue.nowMonth
                                            }
                                            data-date={item.date}
                                            data-day={item.day}
                                            onClick={selectDateChangeHandler}
                                        >
                                            {item.date}
                                            {selectDate.date === item.date && (
                                                <img
                                                    css={selectedDayStyle}
                                                    src={checkIcon}
                                                />
                                            )}
                                        </span>
                                    );
                            }
                        })}
                    </li>
                ))}
        </ul>
    );
};

export default CalendarDate;
