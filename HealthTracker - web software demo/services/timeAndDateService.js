

const getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = String(today.getFullYear());

    today = yyyy + '-' + mm + '-' + dd;
    return today
}

const getYesterdaysDate = () => {
    var today = new Date();
    var pastDate = today.getDate() - 1;
    today.setDate(pastDate);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = String(today.getFullYear());

    today = yyyy + '-' + mm + '-' + dd;
    return today
}

function getWeekNumber(d) {

    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return [d.getUTCFullYear(), weekNo];

}

const getLastWeek = () => {
    var date = new Date();
    var pastDate = date.getDate() - 7;
    date.setDate(pastDate);
    var currentWeek = getWeekNumber(date);
    var lastWeekFormat = currentWeek[0] + '-W' + currentWeek[1]

    return lastWeekFormat
}

const getLastMonth = () => {
    var date = new Date();
    var mm = String(date.getMonth()).padStart(2, '0'); //January is 0!
    var yyyy = String(date.getFullYear());

    var monthAgo = yyyy + '-' + mm;
    return monthAgo
}

const getMondayAndSundayDayOfLastweek = () => {

    var monday = new Date();

// set to Monday of this week
    monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7);

// set to previous Monday
    monday.setDate(monday.getDate() - 7);

// create new date of day before
    var sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
    
    
    const days = []

    var dd1 = String(monday.getDate()).padStart(2, '0');
    var mm1 = String(monday.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy1 = String(monday.getFullYear());

    var dd2 = String(sunday.getDate()).padStart(2, '0');
    var mm2 = String(sunday.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy2 = String(sunday.getFullYear());

    monday = yyyy1 + '-' + mm1 + '-' + dd1;

    sunday = yyyy2 + '-' + mm2 + '-' + dd2;

    days.push(monday);
    days.push(sunday);

    return days
}


const getMondayAndSundayOfCurrentweek = (week) => {
    var yearAndWeek = week.split("-W")
    var year = Number(yearAndWeek[0]);
    var week = Number(yearAndWeek[1]);
    var firstDay = new Date(year, 0, 1).getDay();
    var y = new Date("Jan 01, " + year + " 01:00:00");
    var w = y.getTime() - (3600000 * 24 * (firstDay - 1)) + 604800000 * (week - 1)
    var n1 = new Date(w);
    var n2 = new Date(w + 518400000)
    
    
    const days = []

    var dd1 = String(n1.getDate()).padStart(2, '0');
    var mm1 = String(n1.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy1 = String(n1.getFullYear());

    var dd2 = String(n2.getDate()).padStart(2, '0');
    var mm2 = String(n2.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy2 = String(n2.getFullYear());

    var monday = yyyy1 + '-' + mm1 + '-' + dd1;

    var sunday = yyyy2 + '-' + mm2 + '-' + dd2;

    days.push(monday);
    days.push(sunday);

    return days
}

const getLast7Days = async() => {
    var my_date7th = new Date();
    var my_date1st = new Date();
    var date = my_date7th.getDate() - 6;
    my_date1st.setDate(date)

    var dd1 = String(my_date1st.getDate()).padStart(2, '0');
    var mm1 = String(my_date1st.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy1 = String(my_date1st.getFullYear());

    var dd2 = String(my_date7th.getDate()).padStart(2, '0');
    var mm2 = String(my_date7th.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy2 = String(my_date7th.getFullYear());

    my_date1st = yyyy1 + '-' + mm1 + '-' + dd1
    my_date7th = yyyy2 + '-' + mm2 + '-' + dd2

    
    return [my_date7th,my_date1st]

}


const getFirstAndLastDayOfLastmonth = async() => {

    var my_date = new Date();
    
    var mm = String(my_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    mm = Number(mm) - 1
    if (String(mm).length == 2) {
        mm = String(mm)
    }
    else {
        mm = "0" + String(mm)
    }
    var yyyy = String(my_date.getFullYear());


    const yearAndMonth = yyyy + '-' + mm

    const days = await getFirstAndLastDayOfCurrentmonth(yearAndMonth)

    return days
}

const getFirstAndLastDayOfCurrentmonth = async(month) => {
    const days = [];

    var yearAndMonth = month.split("-")
    var year = Number(yearAndMonth[0]);
    var month = Number(yearAndMonth[1]);
    var my_date = new Date(year, month-1); 
    var first_day = new Date(my_date.getFullYear(), my_date.getMonth(), 1); 
    var last_day = new Date(my_date.getFullYear(), my_date.getMonth() + 1, 0); 

    var dd1 = String(first_day.getDate()).padStart(2, '0');
    var mm1 = String(first_day.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy1 = String(first_day.getFullYear());

    var dd2 = String(last_day.getDate()).padStart(2, '0');
    var mm2 = String(last_day.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy2 = String(last_day.getFullYear());

    first_day = yyyy1 + '-' + mm1 + '-' + dd1
    last_day = yyyy2 + '-' + mm2 + '-' + dd2

    days.push(first_day);
    days.push(last_day);

    return days
}


const getCurrentTime = () => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time
} 

export {getLast7Days,getYesterdaysDate,getCurrentTime,getCurrentDate,getLastWeek,getMondayAndSundayDayOfLastweek,getLastMonth,getMondayAndSundayOfCurrentweek,getFirstAndLastDayOfLastmonth,getFirstAndLastDayOfCurrentmonth}