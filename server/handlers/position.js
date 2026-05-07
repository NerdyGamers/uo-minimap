// Handles player:update events
// Broadcasts live position to all other players in the same channel

module.exports = function registerPositionHandlers(io, socket, channel) {
  socket.on('player:update', (data) => {
    // data: { id, name, x, y, facet }
    socket.to(channel).emit('player:update', {
      id: socket.id,
      name: data.name,
      x: data.x,
      y: data.y,
      facet: data.facet
    });
  });
};
