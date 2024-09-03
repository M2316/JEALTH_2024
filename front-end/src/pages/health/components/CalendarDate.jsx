import React, { useEffect } from "react";
import {
    AfterMonthDateStyle,
    BeforeMonthDateStyle,
    calendarContentStyle,
    doneRecordedDayStyle,
    recordedDayStyle,
    todayStyle,
} from "./CalendarDateStyle";
import dayjs from "dayjs";
import { selectedDayStyle } from "./CalendarStyle";
import checkIcon from "@img/check-icon-3.png";
import { useSelector } from "react-redux";
import touchVibrateUtil from "../../../utils/touchVibrateUtil";
import { useAnimate } from "framer-motion";

const CalendarDate = ({
    type,
    selectDate,
    setSelectDate,
    nowDate,
    renderCalendarValue,
    monthAnimateControls,
}) => {
    //redux to State AND dispatch
    const recordList = useSelector((state) => state.workoutRecord.workoutInfo);

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
        touchVibrateUtil([50]);
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
        touchVibrateUtil([50, 0, 50, 0, 50]);
        //월 TEXT애니메이션
        monthAnimateControls.start(
            { y: [-20, 0], opacity: [0, 1] },
            { transition: 0.1 }
        );
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
        touchVibrateUtil([50, 0, 50, 0, 50]);
        //월 TEXT애니메이션
        monthAnimateControls.start(
            { y: [20, 0], opacity: [0, 1] },
            { transition: 0.1 }
        );
    };

    //애니메이션 관련 코드 start ================================================================================
    const [scope, animate] = useAnimate();

    useEffect(() => {
        const checkImg = document.querySelector(
            `[data-month="${selectDate.month}"][data-date="${selectDate.date}"] img`
        );
        checkImg &&
            animate(
                checkImg,
                { y: [-5, 0] },
                { duration: 0.3, type: "spring", stiffness: 400 }
            );
    }, [selectDate]);

    //애니메이션 관련 코드 end ================================================================================

    return (
        <ul css={calendarContentStyle}>
            {renderCalendarValue &&
                renderCalendarValue.weeklyDivision.map((week, idxA) => (
                    <li key={idxA + "week"}>
                        {week.map((item, idx) => {
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
                                            data-month={dayjs(
                                                `${renderCalendarValue.nowYear}-${renderCalendarValue.nowMonth}-${item.date}`
                                            )
                                                .subtract(1, "month")
                                                .format("MM")}
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
                                            data-month={dayjs(
                                                `${item.year}-${item.month}-${item.date}`
                                            )
                                                .add(1, "month")
                                                .format("MM")}
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

                                                () => {

                                                    //해당 날짜에 record가 있는지 확인
                                                    const nowDayRecord =
                                                        recordList.filter(
                                                            (filterItem) =>
                                                                filterItem.workoutDate ===
                                                                `${renderCalendarValue.nowYear}-${renderCalendarValue.nowMonth}-${item.date}`
                                                        );
                                                    // 입력한 루틴이 없으면 표시 x
                                                    if (nowDayRecord.length === 0) 
                                                        return;

                                                    // 입력한 루틴 중 setDoneFlag가 false 인게 있으면 찾음
                                                    const scoreBeforeDone =
                                                        nowDayRecord.find(
                                                            (item) => {
                                                                return item.scoreList.find(
                                                                    (
                                                                        findItem
                                                                    ) =>
                                                                        !findItem.setDoneFlag
                                                                )
                                                                    ? item
                                                                    : null;
                                                            }
                                                        );

                                                    if (scoreBeforeDone) {
                                                        return recordedDayStyle;
                                                    } else {
                                                        return doneRecordedDayStyle;
                                                    }
                                                },
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
