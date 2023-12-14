import http from 'http';
import { Server } from 'socket.io';
const server = http.createServer(() => {});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", 'OPTIONS']
  }
});


io.on('connection', (socket) => {
    console.log('someone connected');
    
    // Handle chat messages sent via slack directly
    socket.on('slack-message-recieved', (message) => {
      
      console.log('message recieved from slack', message)
      // forwards messages to the next app
      io.emit('slack-message-forwarded', message); // Broadcast the message to all connected clients
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
  
  server.listen(3001);