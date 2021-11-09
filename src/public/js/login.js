const button = document.getElementById('gotoRegister');
const loginButton = document.getElementById('loginButton');

button.addEventListener('click', async event => {
  try {
    location.href = 'register';
  } catch (err) {
    console.error(`Error: ${err}`);
  }
});

loginButton.addEventListener('click', async data => {
  try {
    const loginInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    let res = await fetch('/login', {
      method: 'POST',
      mode: 'same-origin',
      redirect: 'follow',
      credentials: 'include', // Don't forget to specify this if you need cookies
      headers: headers,
      body: JSON.stringify({
        email: loginInput,
        password: passwordInput,
      }),
    });
    if ( res.status == 200 ) {
      location.href = "/";
    }
  } catch (error) {
    console.log('error',error);
  }
});
