
import {showSummaryService} from "../../services/summaryService.js"


const showSummary = async({render,request,session}) => {
            const data = await showSummaryService({session,request});
            render('Summary.ejs',data);
    }



export {showSummary}