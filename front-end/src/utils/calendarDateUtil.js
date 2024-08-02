import dayjs from "dayjs";

const calendarDate = (insertDate)=>{

    //return List
    let calendarDateList = {
        calendarDate:[], //6행 달력 
        weeklyDivision:[],
        nowMonth:"",
        nowYear:""
    };
    

    //현재 달 일 추가
    const date = dayjs(insertDate).startOf('month');
    calendarDateList.nowYear = date.format("YYYY");
    calendarDateList.nowMonth = date.format("MM");
    const thisMonthLastDate = date.endOf('month').date();
    for(let i=0; i<thisMonthLastDate; i++){

        calendarDateList.calendarDate.push({
            type:"nowMonth",
            date:date.add(i,'day').format("DD"),
            day:date.add(i,'day').format("ddd")
        })
    }
    

    //전 달 일 추가
    const beforeMonthLastDate = date.subtract(1,'month').endOf('month');
    const beforeMonthLastDay = date.subtract(1,'month').endOf('month').day();
    for(let i=0; i<=beforeMonthLastDay; i++){        
        calendarDateList.calendarDate.unshift({
            type:"beforeMonth",
            date:beforeMonthLastDate.subtract(i,"day").format("DD"),
            day:beforeMonthLastDate.subtract(i,"day").format("ddd")
        });
    }
    
    //다음 달 일 추가
    const afterMonthDate = date.endOf("month").add(1,"date");
    const calendarListLength = calendarDateList.calendarDate.length;
    for(let i=0; i < 42 - calendarListLength; i++){
        calendarDateList.calendarDate.push({
            type:"afterMonth",
            date:afterMonthDate.add(i,"day").format("DD"),
            day:afterMonthDate.add(i,"day").format("ddd"),
        });
    }
    // const beforeMonthLastDate = date.subtract(1,'month').endOf('month');
    // const beforeMonthLastDay = beforeMonthLast.day();

    // //전 달 일 추가
    // for(let i=0; i<=beforeMonthLastDay; i++){        
    //     calendarDateList.calendarDate.unshift({
    //         type:"beforeMonth",
    //         date:beforeMonthLastDate.subtract(i,"date").format("DD"),
    //         day:beforeMonthLastDate.subtract(i,"date").format("ddd")
    //     });
    // }

    // //다음 달 일 추가
    // const afterMonthDate = calendarDateList.calendarDate.length;
    // for(let i=0; i < 42 - afterMonthRoof; i++){
    //     calendarDateList.calendarDate.push({
    //         type:"afterMonth",
    //         date:i
    //     });
    // }

    //주 단위 분할
    for(let i=0; i<6;i++){
        calendarDateList.weeklyDivision.push(calendarDateList.calendarDate.slice(i*7,7*i+7));
    }

    

    return calendarDateList;
}

export default calendarDate;