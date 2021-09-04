

const showLoginForm = ({render}) => {
  const data = {
    errors: [],
  }
  render('login.ejs',data);
}

const showRegistrationForm = ({render}) => {
  const data = {
    errors: [],
    email: ''
  }
  render('register.ejs',data);
}

export { showLoginForm,showRegistrationForm };