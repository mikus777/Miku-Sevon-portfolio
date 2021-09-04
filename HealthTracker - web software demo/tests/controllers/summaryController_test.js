import { superoak } from "../../deps.js"
import { app } from "../../app.js"
import {testLogin} from "../../utils/testHelper.js"


Deno.test({
    name: "Summary page show's no data for current week or month if user hasn't reported anything",
    async fn() {
      let testClient = await superoak(app);
      let response = await testLogin();
      let headers = response.headers["set-cookie"];
      let cookie = headers.split(";")[0];

      await testClient.get('/summary').set('Cookie',cookie).expect('<form method="GET" action="/auth/logout">\r\n    <input type="submit" value="Log out" />\r\n</form>\r\n\r\n<h1>What would you like to do?</h1>\r\n<form method="POST" action="/summary">\r\n    <p>\r\n    Select week: <input type="week" name="week" value="2020-W49"/>\r\n    </p>\r\n    <lu>Statistics for the week:</lu>\r\n    \r\n        <li>No data for given week exists.</li>\r\n    \r\n    <p>\r\n    Select Month: <input type="month" name="month" value="2020-11" />\r\n    </p>\r\n    <lu>Statistics for the month:</lu>\r\n    \r\n        <li>No data for given month exists.</li>\r\n    \r\n    <p>\r\n\r\n    </p>>\r\n    <input type="submit" value="Update summaries!" />\r\n</form>\r\n\r\n<form method="GET" action="/">\r\n    <input type="submit" value="Back to main page" />\r\n</form>\r\n')
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });