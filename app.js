const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const socket = require('socket.io');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'MajorProjectDB'
  });
  
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

const app = express();
const http = require('http').Server(app);
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/register', (req, res) => {
    const { name, username, password, role } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;

        const user = { name, username, password: hashedPassword , role };

        connection.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) throw err;
        res.send('User registered successfully');
        });
    });
});   
  
  // User login
app.post('/login', (req, res) => {
const { username, password } = req.body;

connection.query('SELECT * FROM users WHERE username = ?', username, (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
    res.status(401).send('Invalid username or password');
    } else {
    const user = results[0];

    bcrypt.compare(password, user.password, (err, match) => {
        if (err) throw err;

        if (match) {
        const token = jwt.sign({ username: user.username, name: user.name, role: user.role }, 'MajorProjectDB');

        res.json({ token });
        } else {
        res.status(401).send('Invalid username or password');
        }
    });
    }
});
});

  
  
app.post('/logout', (req, res) => {
    res.send('User logged out successfully');
});
  

app.get('/check-token', (req, res) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid token format' });
    }
  
    const token = authHeader.split(' ')[1];
  
    jwt.verify(token, 'MajorProjectDB', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      const { username, name, role } = decoded;
  
      res.status(200).json({ message: 'Token is valid',username, name, role });
    });
});  

//WebRTC

let peers = [];
const broadcastEventTypes = {
  ACTIVE_USERS:'ACTIVE_USERS'
}
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = socket(server,{
  cors: {
    origin:'*',
    methods:['GET','POST']
  }
})

io.on('connection',(socket)=>{
  socket.emit('connection',null)
  socket.on('register-new-user',(data)=>{
    peers.push({
      username:data.username,
      socketId:data.socketId
    })
   
    io.sockets.emit('broadcast',{
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers:peers
    })
  })

  socket.on('disconnect',()=>{
    peers = peers.filter(peer => peer.socketId !== socket.id)
    io.sockets.emit('broadcast',{
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers:peers
    })
  })


  //listeners related with direct call
  socket.on('pre-offer',(data)=>{
    io.to(data.callee.socketId).emit('pre-offer',{
      callerUsername:data.caller.username,
      callerSocketId:socket.id
    })
  })

  socket.on('pre-offer-answer',(data)=>{
    io.to(data.callerSocketId).emit('pre-offer-answer',{
      answer:data.answer
    })
  })

  socket.on('webRTC-offer',(data)=>{
    io.to(data.calleeSocketId).emit('webRTC-offer',{
      offer:data.offer
    })
  })

  socket.on('webRTC-answer',(data)=>{
    console.log('handling webRTC answer')
    io.to(data.callerSocketId).emit('webRTC-answer',{
      answer:data.answer
    })
  })

  socket.on('webRTC-candidate',(data)=>{
    console.log('handling ice candidate')
    io.to(data.connectedUserSocketId).emit('webRTC-candidate',{
      candidate:data.candidate
    })
  })

  socket.on('user-hanged-up',(data)=>{
    io.to(data.connectedUserSocketId).emit('user-hanged-up')
  })
})