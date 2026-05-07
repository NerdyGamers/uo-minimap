# uo-minimap

A lightweight self-hosted realtime server for Ultima Online live maps and proximity voice chat. The [ClassicUO](https://github.com/ClassicUO/ClassicUO) plugin is the client — this repo is the server.

## What it does

- Broadcasts live player positions to all connected clients on a shared channel
- Syncs shared map markers (add, remove, label, icon)
- Routes proximity voice via WebRTC (LiveKit SFU) with distance-based volume/filter attenuation
- Self-hostable by any shard owner with a single command

## Quick Start

```bash
# Node.js
npm install && npm start

# Docker (coming soon)
docker run -p 3000:3000 nerdygamers/uo-minimap
```

## Project Structure

```
uo-minimap/
├── server/          # Node.js + Socket.IO backend
│   ├── index.js     # Entry point
│   ├── handlers/    # Socket event handlers (position, markers, voice)
│   └── config.js    # Server configuration
├── voice/           # LiveKit SFU integration (optional module)
└── docs/            # API spec, self-hosting guide, plugin integration
```

## Tech Stack

| Layer | Technology |
|---|---|
| Realtime State | Node.js + Socket.IO |
| Voice SFU | LiveKit (self-hosted, optional) |
| Transport | WebSocket (positions + markers), WebRTC (voice) |

## Milestones

- [ ] M1 — Server scaffold, WebSocket connection, player position broadcast
- [ ] M2 — Channel/shard namespacing, player list management
- [ ] M3 — Shared marker system
- [ ] M4 — LiveKit voice integration
- [ ] M5 — Proximity attenuation from plugin distance updates
- [ ] M6 — Server config file
- [ ] M7 — Docker image + self-hosting docs

## License

MIT
