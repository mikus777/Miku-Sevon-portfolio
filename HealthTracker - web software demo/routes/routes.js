//router import
import { Router } from "../deps.js";
//controller imports
import { showLoginForm,showRegistrationForm } from "./controllers/loginAndRegisterController.js";
import { showMainpage } from "./controllers/mainpageController.js"
import * as showreport from "./controllers/reportController.js"
import { showSummary } from "./controllers/summaryController.js";

//service imports
import {logOut} from "../services/logOutService.js"
import { postRegistrationForm,postLoginForm} from "../services/PostLoginAndRegistrationService.js";
const router = new Router();

//api imports
import {summaryOf7DaysApi,summaryOf1DayApi} from "./apis/summaryApi.js"

router.get('/', showMainpage)

//login and registration routes
router.get('/auth/login', showLoginForm);
router.get('/auth/registration', showRegistrationForm);

router.post('/auth/login', postLoginForm);
router.post('/auth/registration',postRegistrationForm);


//log out route
router.get('/auth/logout',logOut);

//reporting routes
router.get('/behaviour/reporting',showreport.showReportpage)
router.get('/behaviour/reporting/morning',showreport.showMorningReport);
router.get('/behaviour/reporting/evening',showreport.showEveningReport);

router.post('/behaviour/reporting/morning/post',showreport.showPostMorning);
router.post('/behaviour/reporting/evening/post',showreport.showPostEvening);

//route for summarypage
router.get('/summary',showSummary);
router.post('/summary',showSummary);

//route for api
router.get("/api/summary",summaryOf7DaysApi)
router.get("/api/summary/:year/:month/:day",summaryOf1DayApi)



export { router };