import { executeQuery } from "../database/database.js"
import {getUserId} from "./userService.js"
import {getMondayAndSundayDayOfLastweek,getMondayAndSundayOfCurrentweek,getFirstAndLastDayOfLastmonth,getFirstAndLastDayOfCurrentmonth} from "./timeAndDateService.js"
import {getLastWeek,getLastMonth} from "../services/timeAndDateService.js"
import {emailController} from "../routes/controllers/userController.js"


const showSummaryService = async({session,request}) => {
    if (request.method == "GET") {
        const data = {
            weeklySummary: await getWeeklySummaryService({session,request}),
            week: getLastWeek(),
            monthlySummary: await getMonthlySummaryService({session,request}),
            month: getLastMonth(),
            logged_user: await emailController({session})
        }
        return data
    }

    else if (request.method == "POST") {

        const body = request.body();
        const params = await body.value;

        const data = {
            weeklySummary: await getWeeklySummaryService({session,request}),
            week: params.get("week"),
            monthlySummary: await getMonthlySummaryService({session,request}),
            month: params.get("month"),
            email: await emailController({session})
        }

        if (!params.get("month")) {
            data.month = getLastMonth()
        }

        if (!params.get("week")) {
            data.week = getLastWeek()
        }

        return data
}   
}




const getWeeklySummaryService = async({session,request}) => {
    const userId = await getUserId({session});

    if (request.method == "GET") {
        //if no week is given -> method is get
        //get last weeks monday and sunday
        const lastweekDays = await getMondayAndSundayDayOfLastweek();
        var firstDay = lastweekDays[0]
        var lastDay = lastweekDays[1]
    }
    else if (request.method == "POST") {
        const body = request.body();
        const params = await body.value;
  
        const currentWeek = params.get('week');
        const currentweekDays = await getMondayAndSundayOfCurrentweek(currentWeek);
        var firstDay = currentweekDays[0];
        var lastDay = currentweekDays[1];
    }

    const summary = getStats(userId,firstDay,lastDay)
    return summary
}


const getMonthlySummaryService = async({session,request}) => {
    const userId = await getUserId({session});

    if (request.method == "GET") {
        //if no week is given -> method is get
        //get last weeks monday and sunday
        const lastMonthDays = await getFirstAndLastDayOfLastmonth();
        var firstDay = lastMonthDays[0]
        var lastDay = lastMonthDays[1]
    }
    else if (request.method == "POST") {
        const body = request.body();
        const params = await body.value;
  
        const currentMonth = params.get('month');
        const currentMonthDays = await getFirstAndLastDayOfCurrentmonth(currentMonth);
        var firstDay = currentMonthDays[0];
        var lastDay = currentMonthDays[1];
    }

    const summary = getStats(userId,firstDay,lastDay)
    return summary
}


const getStats = async(userId,firstDay,lastDay) => {
    const sleep_duration =  await executeQuery("SELECT AVG(sleep_duration) FROM morning_reports WHERE user_id = ($1) AND date BETWEEN ($2) AND ($3);",userId,firstDay,lastDay)
    const sleep_quality = await executeQuery("SELECT AVG(sleep_quality) FROM morning_reports WHERE user_id = ($1) AND date BETWEEN ($2) AND ($3);",userId,firstDay,lastDay)
    const generic_mood_morning = await executeQuery("SELECT AVG(generic_mood) FROM morning_reports WHERE user_id = ($1) AND date BETWEEN ($2) AND ($3);",userId,firstDay,lastDay)
    const exercise_time = await executeQuery("SELECT AVG(exercise_time) FROM evening_reports WHERE user_id = ($1) AND date BETWEEN ($2) AND ($3);",userId,firstDay,lastDay)
    const studying_time = await executeQuery("SELECT AVG(studying_time) FROM evening_reports WHERE user_id = ($1) AND date BETWEEN ($2) AND ($3);",userId,firstDay,lastDay)
    const eating_reqularity = await executeQuery("SELECT AVG(eating_reqularity) FROM evening_reports WHERE user_id = ($1) AND date BETWEEN ($2) AND ($3);",userId,firstDay,lastDay)
    const eating_quality = await executeQuery("SELECT AVG(eating_quality) FROM evening_reports WHERE user_id = ($1) AND date BETWEEN ($2) AND ($3);",userId,firstDay,lastDay)
    const generic_mood_evening = await executeQuery("SELECT AVG(generic_mood) FROM evening_reports WHERE user_id = ($1) AND date BETWEEN ($2) AND ($3);",userId,firstDay,lastDay)

    const stats = {
        sleep_duration: Number(Number(sleep_duration.rowsOfObjects()[0].avg).toFixed(1)),
        sleep_quality: Number(Number(sleep_quality.rowsOfObjects()[0].avg).toFixed(1)),
        generic_mood_morning: Number(Number(generic_mood_morning.rowsOfObjects()[0].avg).toFixed(1)),
        exercise_time: Number(Number(exercise_time.rowsOfObjects()[0].avg).toFixed(1)),
        studying_time: Number(Number(studying_time.rowsOfObjects()[0].avg).toFixed(1)),
        eating_reqularity: Number(Number(eating_reqularity.rowsOfObjects()[0].avg).toFixed(1)),
        eating_quality: Number(Number(eating_quality.rowsOfObjects()[0].avg).toFixed(1)),
        generic_mood_evening: Number(Number(generic_mood_evening.rowsOfObjects()[0].avg).toFixed(1))
    }

    return stats
}


export {showSummaryService}