import { superoak } from "../../deps.js"
import { app } from "../../app.js"


Deno.test({
    name: "Path '/auth/logOut' logs out and unauthenticates user",
    async fn() {
      let testClient = await superoak(app);
      let response = await testClient.get("/auth/logOut");
      let headers = response.headers["set-cookie"];
      let cookie = headers.split(";")[0];

      testClient = await superoak(app);
      await testClient.get('/summary').set('Cookie',cookie).expect('<h1>Oops!</h1>\r\n<p>Looks like you haven\'t logged in yet.</p>\r\n<form method="GET" action="/auth/login">\r\n    <label>Login here:\r\n    <input type="submit" value="Login" />\r\n    </label>\r\n</form>')
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });