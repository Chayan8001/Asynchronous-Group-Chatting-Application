//Node Server which will handle socket.io connections

const io = require('socket.io')(8000);//as i careated io variable to run socket.io on the port number 8000
// the socket.io server will listen the incoming events

const users = {};// its is for the users connected

// io.on --- it is the instance of the socket.io adn it is used to listen the events of the socket.io 
//(like example it listen whenever anyone joins and the messages )

io.on('connection' , socket=>{
    //socket.on only handles the function of the events
    //new-user-joined is not a predefined event it can be anything you want
    socket.on('new-user-joined' , name=>{
        // console.log('New User' , name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined'  , name);//it will show the notification to all the user except the user joined
    });
    // if someone sends the message broadcast it to all the user
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message , name : users[socket.id]})
    });
    // if someone leaves the chat also broadcast it to all the user
    // disconnect is a built in app
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})

