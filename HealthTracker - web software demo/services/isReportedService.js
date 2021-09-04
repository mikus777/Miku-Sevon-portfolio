
import { executeQuery } from '../database/database.js'
import {getCurrentDate} from '../services/timeAndDateService.js'
import {getUserId} from '../services/userService.js'


const getIsMorningReported = async({session}) => {
    const user_id = await getUserId({session});
    const currentDate = await getCurrentDate();
    const todaysMorning = await executeQuery("SELECT * FROM morning_reports WHERE user_id = ($1) AND date = ($2);",user_id,currentDate)
    if (todaysMorning.rowCount === 0) {
        return false
    }
    else {
        return true
    }
}


const getIsEveningReported = async({session}) => {
    const user_id = await getUserId({session});
    const currentDate = await getCurrentDate();
    const todaysMorning = await executeQuery("SELECT * FROM evening_reports WHERE user_id = ($1) AND date = ($2);",user_id,currentDate)
    if (todaysMorning.rowCount === 0) {
        return false
    }
    else {
        return true
    }
}

export {getIsMorningReported,getIsEveningReported}