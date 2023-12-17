const http  =  require('http');
const { Server } = require('socket.io');
const server = http.createServer(() => {});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", 'OPTIONS']
  }
});


io.on('connection', (socket) => {
    console.log('connection established');
    
    // Handle chat messages sent via slack directly
    socket.on('slack-message-recieved', (message) => {
      
      
      // forwards messages to the next app
      io.emit('slack-message-forwarded', message); // Broadcast the message to all connected clients
    });
  
    socket.on('disconnect', () => {
      console.log('connection dropped');
    });
  });
  
  server.listen(3001, '0.0.0.0');