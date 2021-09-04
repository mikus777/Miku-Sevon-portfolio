import { superoak } from "../../deps.js";
import {testLogin} from "../../utils/testHelper.js"
import {app} from "../../app.js"
import { getCurrentDate } from "../../services/timeAndDateService.js";
import {getRandomInt,getRandomArbitrary} from "../../utils/random.js"
import { executeQuery } from "../../database/database.js";
import {assertEquals} from "../../deps.js"

Deno.test({
    name: "Reporting morning with correct values and value types renders ejs with 'Posted!'",
    async fn() {
      let testClient = await superoak(app);
      let response = await testLogin();
      let headers = response.headers["set-cookie"];
      let cookie = headers.split(";")[0];

      let date = await getCurrentDate();
      let sleepDuration = getRandomInt(24);
      let SleepQuality = getRandomInt(5);
      let GenericMood = getRandomInt(5);

      await testClient.post('/behaviour/reporting/morning/post').set('Cookie',cookie).send("day="+date+"&SleepDuration="+sleepDuration+"&SleepQuality="+SleepQuality+"&GenericMood="+GenericMood)
      .expect('<p>Posted!</p>\r\n<form method="GET" action="/behaviour/reporting">\r\n    <input type="submit" value="Go back to report page" />\r\n</form>')
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });
  

  Deno.test({
    name: "Reporting evening with correct values and value types renders ejs with 'Posted!",
    async fn() {
      let testClient = await superoak(app);
      let response = await testLogin();
      let headers = response.headers["set-cookie"];
      let cookie = headers.split(";")[0];

      let date = await getCurrentDate();
      let exerciseTime = getRandomInt(24);
      let studyingTime = getRandomInt(24);
      let eatingReqularity = getRandomInt(5);
      let eatingQuality = getRandomInt(5);
      let GenericMood = getRandomInt(5);

      await testClient.post('/behaviour/reporting/morning/post').set('Cookie',cookie).send("day="+date+"&exerciseTime="+exerciseTime+"&studyingTime="+studyingTime+"&qualityOfEating="+eatingQuality+"&reqularityOfEating="+eatingReqularity+"&GenericMood="+GenericMood)
      .expect('<p>Posted!</p>\r\n<form method="GET" action="/behaviour/reporting">\r\n    <input type="submit" value="Go back to report page" />\r\n</form>')
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Reporting morning adds statistics to morning_reports table",
    async fn() {
      let testClient = await superoak(app);
      let response = await testLogin();
      let headers = response.headers["set-cookie"];
      let cookie = headers.split(";")[0];

      let date = await getCurrentDate();
      let sleepDuration = getRandomInt(24);
      let SleepQuality = getRandomInt(5);
      let GenericMood = getRandomInt(5);

      const testValues = [sleepDuration,SleepQuality,GenericMood]

      await testClient.post('/behaviour/reporting/morning/post').set('Cookie',cookie).send("day="+date+"&SleepDuration="+sleepDuration+"&SleepQuality="+SleepQuality+"&GenericMood="+GenericMood)
      const res = await executeQuery("SELECT * FROM morning_reports WHERE id=(SELECT max(id) FROM morning_reports)");
      const row = res.rowsOfObjects()[0];
      const data = [row.sleep_duration,row.sleep_quality,row.generic_mood]

      assertEquals(testValues,data);

    },
    sanitizeResources: false,
    sanitizeOps: false,
  });

  Deno.test({
    name: "Reporting evening adds statistics to evening_reports table",
    async fn() {
      let testClient = await superoak(app);
      let response = await testLogin();
      let headers = response.headers["set-cookie"];
      let cookie = headers.split(";")[0];

      let date = await getCurrentDate();
      let exerciseTime = getRandomInt(24);
      let studyingTime = getRandomInt(24);
      let eatingReqularity = getRandomInt(5);
      let eatingQuality = getRandomInt(5);
      let GenericMood = getRandomInt(5);

      const testValues = [exerciseTime,studyingTime,eatingReqularity,eatingQuality,GenericMood]

      await testClient.post('/behaviour/reporting/evening/post').set('Cookie',cookie).send("day="+date+"&exerciseTime="+exerciseTime+"&studyingTime="+studyingTime+"&qualityOfEating="+eatingQuality+"&reqularityOfEating="+eatingReqularity+"&GenericMood="+GenericMood)
      const res = await executeQuery("SELECT * FROM evening_reports WHERE id=(SELECT max(id) FROM evening_reports)");
      const row = res.rowsOfObjects()[0];
      const data = [row.exercise_time,row.studying_time,row.eating_reqularity,row.eating_quality,row.generic_mood]

      assertEquals(testValues,data);

    },
    sanitizeResources: false,
    sanitizeOps: false,
  });
