import { executeQuery } from "../database/database.js";
import { getUserId } from "./userService.js"


const postMorning = async({request,session}) => {
    const body = request.body();
    const params = await body.value;
  
    const date = params.get('day');
    const sleepDuration = Number(params.get('SleepDuration'));
    const sleepQuality = Number(params.get('SleepQuality'));
    const genericMood = Number(params.get("GenericMood"));

    const userId = await getUserId({session});

    const duplicate = await executeQuery("SELECT user_id FROM morning_reports WHERE user_id = ($1) AND date = ($2)",userId,date)
    if (!duplicate) {
        await executeQuery("INSERT into morning_reports (user_id,date,sleep_duration,sleep_quality,generic_mood) VALUES ($1,$2,$3,$4,$5);",userId,date,sleepDuration,sleepQuality,genericMood)
    }
    else {
        await executeQuery("DELETE FROM morning_reports WHERE user_id = ($1) AND date = ($2)",userId,date)
        await executeQuery("INSERT into morning_reports (user_id,date,sleep_duration,sleep_quality,generic_mood) VALUES ($1,$2,$3,$4,$5);",userId,date,sleepDuration,sleepQuality,genericMood)
    }
    
    

}

const postEvening = async({request,session}) => {
    const body = request.body();
    const params = await body.value;
  
    const date = params.get('day');
    const exerciseTime = Number(params.get('exerciseTime'));
    const studyingTime = Number(params.get('studyingTime'));
    const reqularityOfEating = Number(params.get('reqularityOfEating'));
    const qualityOfEating = Number(params.get('qualityOfEating'));
    const genericMood = Number(params.get("GenericMood"));
 
    const userId = await getUserId({session});

    const duplicate = await executeQuery("SELECT user_id FROM evening_reports WHERE user_id = ($1) AND date = ($2)",userId,date)
    if (!duplicate) {
        await executeQuery("INSERT into evening_reports (user_id,date,exercise_time,studying_time,eating_reqularity,eating_quality,generic_mood) VALUES ($1,$2,$3,$4,$5,$6,$7);",userId,date,exerciseTime,studyingTime,reqularityOfEating,qualityOfEating,genericMood)
    }
    else {
        await executeQuery("DELETE FROM evening_reports WHERE user_id = ($1) AND date = ($2)",userId,date)
        await executeQuery("INSERT into evening_reports (user_id,date,exercise_time,studying_time,eating_reqularity,eating_quality,generic_mood) VALUES ($1,$2,$3,$4,$5,$6,$7);",userId,date,exerciseTime,studyingTime,reqularityOfEating,qualityOfEating,genericMood)
    }
        
    
}


export {postMorning,postEvening}