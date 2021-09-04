import {superoak} from "../../deps.js"
import {app} from "../../app.js"
import {testLogin} from "../../utils/testHelper.js"

Deno.test({
    name: "checkAuth middleware test: Everyone can access the mainpage",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get('/').expect('<h1>Welcome to HealthTracker!</h1>\r\n<p>HealthTracker is an application that helps you keep track of sleeping schedule, activity and general lifestyle.\r\nTracking your health has never been easier!\r\n</p>\r\n<p>If you already have an account, welcome back!\r\n    If you don\'t you can make one easily using the register button.\r\n</p>\r\n<form method="GET" action="/auth/login">\r\n    <input type="submit" value="Login" />\r\n</form>\r\n<form method="GET" action="/auth/registration">\r\n    <input type="submit" value="Register" />\r\n</form>');
  
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "checkAuth middleware test: Everyone can access pages starting with '/auth'",
    async fn() {
      let testClient = await superoak(app);
      await testClient.get('/auth/login').expect('<h1>Login!</h1>\r\n<form method="POST" action="/auth/login">\r\n    <label for="email">Email-address:</label>\r\n    <input type="email" name="email" />\r\n    <label for="password">Password:</label>\r\n    <input type="password" name="password" />\r\n    <input type="submit" value="Login!" />\r\n</form>\r\n<form method="GET" action="/auth/registration">\r\n    <input type="submit" value="Don\'t have an user? Register here." />\r\n</form>\r\n\r\n\r\n\r\n<form method="GET" action="/">\r\n    <input type="submit" value="Back to main page" />\r\n</form>');
      testClient = await superoak(app);
      await testClient.get('/auth/registration').expect('<h1>Register!</h1>\r\n<form method="POST" action="/auth/registration">\r\n    <label for="email">Email-address:</label>\r\n    <input type="email" name="email" value=""" />\r\n\r\n    <label for="password">Password:</label>\r\n    <input type="password" name="password" minlength="4"/>\r\n    <label for="verification">Verify the password:</label>\r\n    <input type="password" name="verification" minlength="4"/>\r\n    <input type="submit" value="Submit!"/>\r\n</form>\r\n\r\n');
  
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "checkAuth middleware test: Only authenticated users can access report and summary pages",
    async fn() {
      //before authentication
      let testClient = await superoak(app);
      await testClient.get('/behaviour/reporting').expect('<h1>Oops!</h1>\r\n<p>Looks like you haven\'t logged in yet.</p>\r\n<form method="GET" action="/auth/login">\r\n    <label>Login here:\r\n    <input type="submit" value="Login" />\r\n    </label>\r\n</form>');
      testClient = await superoak(app);
      await testClient.get('/summary').expect('<h1>Oops!</h1>\r\n<p>Looks like you haven\'t logged in yet.</p>\r\n<form method="GET" action="/auth/login">\r\n    <label>Login here:\r\n    <input type="submit" value="Login" />\r\n    </label>\r\n</form>');
      
      testClient = await superoak(app);
      let response = await testLogin();
      let headers = response.headers["set-cookie"];
      let cookie = headers.split(";")[0];
      //after authenticating user
      await testClient.get('/behaviour/reporting').set('Cookie',cookie).expect('<h1>Would you like to report morning or evening?</h1>\r\n\r\n<form method="GET" action="/behaviour/reporting/morning">\r\n    <input type="submit" value="Report your morning!" />\r\n</form>\r\n\r\n\r\n\r\n\r\n<form method="GET" action="/behaviour/reporting/evening">\r\n    <input type="submit" value="Report your evening!" />\r\n</form>\r\n\r\n\r\n\r\n<form method="GET" action="/">\r\n    <input type="submit" value="Go back to main page" />\r\n</form>\r\n\r\n');
      testClient = await superoak(app);
      await testClient.get('/summary').set('Cookie',cookie).expect('<h1>What would you like to do?</h1>\r\n<form method="POST" action="/summary">\r\n    <p>\r\n    Select week: <input type="week" name="week" value="2020-W49"/>\r\n    </p>\r\n    <lu>Statistics for the week:</lu>\r\n    \r\n        <li>No data for given week exists.</li>\r\n    \r\n    <p>\r\n    Select Month: <input type="month" name="month" value="2020-11" />\r\n    </p>\r\n    <lu>Statistics for the month:</lu>\r\n    \r\n        <li>No data for given month exists.</li>\r\n    \r\n    <p>\r\n\r\n    </p>>\r\n    <input type="submit" value="Update summaries!" />\r\n</form>\r\n');


    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

