// Handles shared map marker events
// Syncs marker add/remove across all players in channel

const markers = {}; // channelId -> Map of markerId -> marker

module.exports = function registerMarkerHandlers(io, socket, channel) {
  if (!markers[channel]) markers[channel] = new Map();

  // Send existing markers to newly connected player
  socket.emit('marker:init', Array.from(markers[channel].values()));

  socket.on('marker:add', (data) => {
    // data: { id, x, y, facet, label, icon }
    markers[channel].set(data.id, { ...data, addedBy: socket.id });
    io.to(channel).emit('marker:add', markers[channel].get(data.id));
  });

  socket.on('marker:remove', (data) => {
    // data: { id }
    markers[channel].delete(data.id);
    io.to(channel).emit('marker:remove', { id: data.id });
  });
};
