
import {getCurrentDate,getYesterdaysDate} from "../services/timeAndDateService.js"

const averageMoodTodayService = async() => {
    const day = getCurrentDate();
    return await averageMoodService(day)
} 

const averageMoodYesterdayService = async() => {
    const day = getYesterdaysDate();
    return await averageMoodService(day)
} 

const averageMoodService = async(day) => {
    const today = day.split('-');
    var yyyy = today[0];
    var mm = today[1];
    var dd = today[2];



    var url = 'http://localhost:7777/api/summary/' + yyyy + '/' + mm + '/' + dd
    const response = await fetch(url);
    const obj = JSON.parse(await response.text());
    const generic_mood = obj.generic_mood

    return generic_mood
}



export {averageMoodTodayService,averageMoodYesterdayService}