import { executeQuery } from "../../database/database.js";
import {getLast7Days} from "../../services/timeAndDateService.js"

const summaryOf7DaysApi = async({response}) => {
    const days = await getLast7Days();
    const lastDay = days[0]
    const firstDay = days[1]

    const sleep_duration =  await executeQuery("SELECT AVG(sleep_duration) FROM morning_reports WHERE date BETWEEN ($1) AND ($2);",firstDay,lastDay)
    const exercise_time =  await executeQuery("SELECT AVG(exercise_time) FROM evening_reports WHERE date BETWEEN ($1) AND ($2);",firstDay,lastDay)
    const studying_time =  await executeQuery("SELECT AVG(studying_time) FROM evening_reports WHERE date BETWEEN ($1) AND ($2);",firstDay,lastDay)
    const sleep_quality =  await executeQuery("SELECT AVG(sleep_quality) FROM morning_reports WHERE date BETWEEN ($1) AND ($2);",firstDay,lastDay)
    const generic_mood_morning =  await executeQuery("SELECT AVG(generic_mood) FROM morning_reports WHERE date BETWEEN ($1) AND ($2);",firstDay,lastDay)
    const generic_mood_evening =  await executeQuery("SELECT AVG(generic_mood) FROM evening_reports WHERE date BETWEEN ($1) AND ($2);",firstDay,lastDay)

    const stats = {
        sleep_duration: Number(Number(sleep_duration.rowsOfObjects()[0].avg).toFixed(1)),
        exercise_time: Number(Number(exercise_time.rowsOfObjects()[0].avg).toFixed(1)),
        studying_time: Number(Number(studying_time.rowsOfObjects()[0].avg).toFixed(1)),
        sleep_quality: Number(Number(sleep_quality.rowsOfObjects()[0].avg).toFixed(1)),
        generic_mood: Number(((Number(Number(generic_mood_morning.rowsOfObjects()[0].avg).toFixed(1)) + Number(Number(generic_mood_evening.rowsOfObjects()[0].avg).toFixed(1))) / 2).toFixed(1)),
    }

    response.body = stats;
    response.headers = new Headers({"Access-Control-Allow-Origin":"http://localhost:7777/api/summary",'Content-Type':'application/json'})

}

const summaryOf1DayApi = async({params,response}) => {

    const year = String(params.year);
    const month = String(params.month);
    const day = String(params.day);

    const date = year + '-' + month + '-' + day;

    const sleep_duration =  await executeQuery("SELECT AVG(sleep_duration) FROM morning_reports WHERE date = ($1)",date)
    const exercise_time =  await executeQuery("SELECT AVG(exercise_time) FROM evening_reports WHERE date = ($1)",date)
    const studying_time =  await executeQuery("SELECT AVG(studying_time) FROM evening_reports WHERE date = ($1)",date)
    const sleep_quality =  await executeQuery("SELECT AVG(sleep_quality) FROM morning_reports WHERE date = ($1)",date)
    const generic_mood_morning =  await executeQuery("SELECT AVG(generic_mood) FROM morning_reports WHERE date = ($1)",date)
    const generic_mood_evening =  await executeQuery("SELECT AVG(generic_mood) FROM evening_reports WHERE date = ($1)",date)

    const stats = {
        sleep_duration: Number(Number(sleep_duration.rowsOfObjects()[0].avg).toFixed(1)),
        exercise_time: Number(Number(exercise_time.rowsOfObjects()[0].avg).toFixed(1)),
        studying_time: Number(Number(studying_time.rowsOfObjects()[0].avg).toFixed(1)),
        sleep_quality: Number(Number(sleep_quality.rowsOfObjects()[0].avg).toFixed(1)),
        generic_mood: Number(((Number(Number(generic_mood_morning.rowsOfObjects()[0].avg).toFixed(1)) + Number(Number(generic_mood_evening.rowsOfObjects()[0].avg).toFixed(1))) / 2).toFixed(1)),
    }


    response.body = stats;
    response.headers = new Headers({"Access-Control-Allow-Origin":"http://localhost:7777/api/summary",'Content-Type':'application/json'})
}



export {summaryOf7DaysApi,summaryOf1DayApi}