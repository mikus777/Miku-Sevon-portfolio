import {executeQuery} from "../database/database.js"
import {bcrypt} from "../deps.js"
import {setCurrentUser} from "../services/userService.js"



const postRegistrationForm = async({request, response, render}) => {
    const data = {
      errors: [],
      email: ""
    }

    const body = request.body();
    const params = await body.value;
    
    const email = params.get('email');
    const password = params.get('password');
    const verification = params.get('verification');
  
    if (password !== verification) {
      data.errors.push('The entered passwords did not match');
      
    }
  
    const existingUsers = await executeQuery("SELECT * FROM users WHERE email = $1", email);
    if (existingUsers.rowCount > 0) {
      data.errors.push('The email is already reserved.');
      
    }

    if (data.errors.length == 0) {
      const hash = await bcrypt.hash(password);
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);
    response.body = 'Registration successful!';
    }
  
    else {
      data.email = email;
      render('register.ejs',data);
    }
  };
  
const postLoginForm = async({request, render, response, session}) => {
    const body = request.body();
    const params = await body.value;
  
    const email = params.get('email');
    const password = params.get('password');

    const data = {
      errors: [],
    }

  
    // check if the email exists in the database
    const res = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
    if (res.rowCount === 0) {
        data.errors.push("This email doesn't have an account yet!")
          render("login.ejs",data)
        }
    else {
    const userObj = res.rowsOfObjects()[0];
  
    const hash = userObj.password;
  
    const passwordCorrect = await bcrypt.compare(password, hash);
    if (!passwordCorrect) {
        data.errors.push('Invalid password.')
    }
    
    if (data.errors.length == 0) {
      setCurrentUser({session},userObj);
      if (!Deno.env.get("TEST_ENVIRONMENT")) {
      response.redirect('/');
    }
    else {
      response.body = 200;
    }
  }
    else {
      render("login.ejs",data)
    }
  } 
}

export {postRegistrationForm,postLoginForm}