// Server configuration
// Override via environment variables or edit defaults below

module.exports = {
  port: process.env.PORT || 3000,

  // Voice proximity thresholds (in UO tiles)
  voice: {
    enabled: process.env.VOICE_ENABLED !== 'false',
    tiers: [
      { maxTiles:  5, volume: 1.00, lowPassHz: null  },
      { maxTiles: 15, volume: 0.75, lowPassHz: null  },
      { maxTiles: 30, volume: 0.40, lowPassHz: 4000  },
      { maxTiles: 60, volume: 0.15, lowPassHz: 2000  },
      { maxTiles: Infinity, volume: 0, lowPassHz: null }
    ]
  },

  // Marker permissions: 'all' | 'party' | 'staff'
  markerPermission: process.env.MARKER_PERMISSION || 'all'
};
