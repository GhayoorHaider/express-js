var socket = io.connect('http://localhost:3000');
let selectedRoom = 1;
let userData = null;

const sendRequest = async (url, type, value)=> {
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const myRequest = new Request('/users', {
    method: type,
    headers: headers,
    mode: 'cors',
    cache: 'default',
  });

  let response = await fetch(myRequest);
  userData = await response.json();
}

sendRequest();

const chat = document.querySelector('.chat-form')
const chatButton = document.querySelector('#chatButton')
const Input = document.querySelector('.chat-input')
const chatWindow = document.querySelector('.chat-window')


chatButton.addEventListener('click', event => {
  event.preventDefault()
  console.log
  socket.emit(`message`, {
    username: userData.data.name,
    msg: Input.value
  })
  Input.value = ''
})

socket.on('chat', function (data) {
  //socket.emit('my other event', { my: 'data' });
  renderMessage(data)
});

const renderMessage = (data) => {
  const div = document.createElement('div')
  div.classList.add('render-message')
  div.innerText = `${data.username} : ${data.text}`
  chatWindow.appendChild(div)
}

