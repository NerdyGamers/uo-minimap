# Self-Hosting Guide

## Requirements

- Node.js 18+
- (Optional) Docker
- (Optional) LiveKit server for voice routing

## Install & Run

```bash
git clone https://github.com/NerdyGamers/uo-minimap.git
cd uo-minimap/server
npm install
npm start
```

Server starts on port `3000` by default. Override with `PORT=8080 npm start`.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Listening port |
| `VOICE_ENABLED` | `true` | Enable proximity voice module |
| `MARKER_PERMISSION` | `all` | Marker add permission level |

## Firewall

Open TCP port `3000` (or your configured port) for WebSocket connections from ClassicUO clients.

## Voice (Optional)

If you want proximity voice, deploy a [LiveKit](https://livekit.io) server and configure the ClassicUO plugin to point at it. The uo-minimap server handles distance signaling only — LiveKit handles audio routing.

## Docker (Coming Soon)

```bash
docker run -p 3000:3000 nerdygamers/uo-minimap
```
