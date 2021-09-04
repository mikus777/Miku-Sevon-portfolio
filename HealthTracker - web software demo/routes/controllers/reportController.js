import {getCurrentDate} from '../../services/timeAndDateService.js'
import { postMorning,postEvening } from '../../services/postreportService.js';
import {getIsMorningReported,getIsEveningReported} from '../../services/isReportedService.js'
import {emailController} from "./userController.js"


const showReportpage = async({render,session}) => {

    const data = {
      morning: await getIsMorningReported({session}),
      evening: await getIsEveningReported({session}),
      email: await emailController({session})
    }
    render('reportPage.ejs',data);
  }

const showMorningReport = async({render,session}) => {
      const data = {
        date: '',
        email: await emailController({session})
      }
    
    data.date = await getCurrentDate();   //app gets current date from currentDateService
    render('morning.ejs',data);
  }


const showEveningReport = async({render,session}) => {
    const data = {
      date: '',
      email: await emailController({session})
    }
  data.date = await getCurrentDate();   //app gets current date from currentDateService
  render('evening.ejs',data);
}


const showPostMorning = async({render,response,request,session}) => {
  await postMorning({request,response,session});
  const data = {
    logged_user: await emailController({session})
  }
  render('morningCompleted.ejs',data)
}

const showPostEvening = async({render,request,response,session}) => {
  await postEvening({request,response,session});
  const data = {
    logged_user: await emailController({session})
  }
  render('eveningCompleted.ejs',data)
}


  
  export {showMorningReport,showEveningReport,showReportpage,showPostMorning,showPostEvening};