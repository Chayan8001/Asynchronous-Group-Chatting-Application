// var socket = io('http://localhost:8000');
var socket = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });
// it connects the server to the index.js through the <script defer src="http://localhost:8000/socket.io/socket.io.js"></script> tag

// Get DOM elelments in the respective js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

// function which will append to the container
const append = (message , position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

// ask new user for his / her name and let the server know
const name= prompt('Enter Your Name and Join');
socket.emit('new-user-joined', name );

// if a new user joins , receive the event(His/Her) from the server and
socket.on('user-joined' , name =>{
    
    append(`${name} Joined the chat ` ,'right');
})

// if server sends a message receive it
socket.on('receive' , data =>{
    
    append(`${data.name}: ${data.message} ` ,'left');
})

// if a user leaves the chat append the info to the server/container
socket.on('left' , name =>{
    
    append(`${name} left the chat ` ,'left');
})

// if the form gets submitted send the server the message
form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value='';
})
