
import {superoak} from "../../../deps.js"
import {app} from "../../../app.js"
import {getCurrentDate} from "../../../services/timeAndDateService.js"


Deno.test({
    name: "SummaryAPI returns and json object.'",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get('/api/summary').expect('Content-Type', new RegExp('application/json'));
  
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

Deno.test({
    name: "SummaryAPI for given day returns and json object.'",
    async fn() {
      const testClient = await superoak(app);
      const date = getCurrentDate();
      const dates = date.split('-')
      const path = '/api/summary/' + dates[0] + '/' + dates[1] + '/' + dates[2];
      await testClient.get(path).expect('Content-Type', new RegExp('application/json'));
  
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });