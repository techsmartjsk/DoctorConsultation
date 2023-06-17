const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
const io = require('socket.io')(http);
const SimplePeer = require('simple-peer');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/register', (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;

        const user = { username, password: hashedPassword };

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
        const token = jwt.sign({ username: user.username }, 'MajorProjectDB');

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
      const { username } = decoded;
  
      res.status(200).json({ message: 'Token is valid', username });
    });
});  

//WebRTC

io.on('connection', (socket) => {
    // When a client wants to initiate a call
    socket.on('call', (offer) => {
      const peer = new SimplePeer({ initiator: false });
  
      peer.on('signal', (answer) => {
        // Send the answer to the calling client
        socket.emit('answer', answer);
      });
  
      // Handle video and audio streams
      socket.on('stream', (stream) => {
        const video = document.getElementById('remoteVideo');
  
        // Attach the remote stream to a video element
        video.srcObject = stream;
        video.play();
      });
  
      // Handle incoming ICE candidates
      socket.on('candidate', (candidate) => {
        // Add the candidate to the peer connection
        peer.addIceCandidate(candidate);
      });
  
      // When the connection is established
      peer.on('connect', () => {
        // Perform any necessary actions when the connection is established
      });
  
      // When the remote peer stream is available
      peer.on('stream', (stream) => {
        // Handle the incoming stream, e.g., display it in the UI
        socket.emit('stream', stream);
      });
  
      // When an ICE candidate is available
      peer.on('iceCandidate', (candidate) => {
        // Send the candidate to the other peer
        socket.emit('candidate', candidate);
      });
  
      // Process the offer from the calling client
      peer.signal(offer);
    });
  });
  
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});