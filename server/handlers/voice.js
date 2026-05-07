// Handles voice session signaling
// Actual audio routing is handled by LiveKit SFU
// This handler manages join/leave and distance updates for attenuation

const config = require('../config');

module.exports = function registerVoiceHandlers(io, socket, channel) {
  if (!config.voice.enabled) return;

  socket.on('voice:join', () => {
    socket.to(channel).emit('voice:joined', { id: socket.id });
  });

  socket.on('voice:leave', () => {
    socket.to(channel).emit('voice:left', { id: socket.id });
  });

  // Plugin sends distance updates so clients can apply attenuation locally
  socket.on('voice:distance', (data) => {
    // data: { targets: [{ id, distance }] }
    // Relay distance map to this player only (used by their local audio engine)
    socket.emit('voice:attenuation', {
      targets: data.targets.map(({ id, distance }) => ({
        id,
        distance,
        tier: getAttenuationTier(distance)
      }))
    });
  });
};

function getAttenuationTier(tiles) {
  for (const tier of config.voice.tiers) {
    if (tiles <= tier.maxTiles) return tier;
  }
  return config.voice.tiers[config.voice.tiers.length - 1];
}
