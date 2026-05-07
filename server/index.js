// uo-minimap server entry point
// Node.js + Socket.IO realtime backend

const { createServer } = require('http');
const { Server } = require('socket.io');
const config = require('./config');
const registerPositionHandlers = require('./handlers/position');
const registerMarkerHandlers = require('./handlers/markers');
const registerVoiceHandlers = require('./handlers/voice');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  const channel = socket.handshake.query.channel || 'default';
  socket.join(channel);

  console.log(`[connect] ${socket.id} joined channel: ${channel}`);

  registerPositionHandlers(io, socket, channel);
  registerMarkerHandlers(io, socket, channel);
  registerVoiceHandlers(io, socket, channel);

  socket.on('disconnect', () => {
    console.log(`[disconnect] ${socket.id} left channel: ${channel}`);
    io.to(channel).emit('player:leave', { id: socket.id });
  });
});

httpServer.listen(config.port, () => {
  console.log(`uo-minimap server running on port ${config.port}`);
});
