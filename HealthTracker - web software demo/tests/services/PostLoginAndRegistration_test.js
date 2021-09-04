
import { superoak } from "../../deps.js"
import { app } from "../../app.js"
import { randomEmail ,randomPassword} from "../../utils/random.js"
import {assertEquals} from "../../deps.js"
import { executeQuery } from "../../database/database.js";



Deno.test({
  name: "Registering a new user returns 'Registration successful!'",
  async fn() {
    let testClient = await superoak(app);
    const email = await randomEmail(8);
    const password = await randomPassword(6);
    await testClient.post('/auth/registration').send('email='+email).send('password='+password).send('verification='+password)
    .expect("Registration successful!");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Logging in with existing user return Status code 200",
  async fn() {
    const testClient1 = await superoak(app);
    const testClient2 = await superoak(app);
    const email = await randomEmail(8);
    const password = await randomPassword(6);
    await testClient1.post('/auth/registration').send('email='+email).send('password='+password).send('verification='+password);
    await testClient2.post('/auth/login').send('email='+email).send('password='+password).expect(200);

  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Logging in with non-existing user logs visible error to user'",
  async fn() {
    const testClient = await superoak(app);
    const email = await randomEmail(8);
    const password = await randomPassword(6);
    await testClient.post('/auth/login').send('email='+email).send('password='+password).expect('<h1>Login!</h1>\r\n<form method="POST" action="/auth/login">\r\n    <label for="email">Email-address:</label>\r\n    <input type="email" name="email" />\r\n    <label for="password">Password:</label>\r\n    <input type="password" name="password" />\r\n    <input type="submit" value="Login!" />\r\n</form>\r\n<form method="GET" action="/auth/registration">\r\n    <input type="submit" value="Don\'t have an user? Register here." />\r\n</form>\r\n\r\n\r\n    <ul>\r\n      \r\n        <li>This email doesn&#39;t have an account yet!</li>\r\n      \r\n    </ul>\r\n\r\n\r\n<form method="GET" action="/">\r\n    <input type="submit" value="Back to main page" />\r\n</form>');

  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Registering new user adds user to database",
  async fn() {
    let testClient = await superoak(app);
    const email = await randomEmail(8);
    const password = await randomPassword(6);
    await testClient.post('/auth/registration').send('email='+email).send('password='+password).send('verification='+password);
    const res = await executeQuery("SELECT * FROM users WHERE id=(SELECT max(id) FROM users)");
    const row = res.rowsOfObjects()[0];
    let realEmail = row.email;
    assertEquals(realEmail,email)
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
