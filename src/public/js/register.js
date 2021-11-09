console.log('Client-side code running');

const button = document.getElementById('gotoLogin');

button.addEventListener('click', async (event) => {
  try {
    location.href = "login";
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});