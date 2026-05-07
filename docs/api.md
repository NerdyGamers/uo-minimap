# uo-minimap Server API

All communication is over WebSocket via Socket.IO. Connect with:

```
ws://your-server:3000?channel=YOUR_SHARD_NAME
```

The `channel` query param namespaces all events to your shard. Players on different channels never see each other.

---

## Events: Client → Server

### `player:update`
Broadcast your current position.
```json
{ "name": "JBob", "x": 1234, "y": 567, "facet": 0 }
```

### `marker:add`
Add a shared map marker visible to all players in the channel.
```json
{ "id": "uuid", "x": 1234, "y": 567, "facet": 0, "label": "Guard Post", "icon": "flag" }
```

### `marker:remove`
Remove a marker by ID.
```json
{ "id": "uuid" }
```

### `voice:join`
Signal that you are entering proximity voice.

### `voice:leave`
Signal that you are leaving proximity voice.

### `voice:distance`
Send current tile distances to nearby players for attenuation.
```json
{ "targets": [{ "id": "socket-id", "distance": 12 }] }
```

---

## Events: Server → Client

### `player:update`
Another player moved.
```json
{ "id": "socket-id", "name": "JBob", "x": 1234, "y": 567, "facet": 0 }
```

### `player:leave`
A player disconnected.
```json
{ "id": "socket-id" }
```

### `marker:init`
Full marker list sent on connect.
```json
[{ "id": "uuid", "x": 1234, "y": 567, "facet": 0, "label": "Guard Post", "icon": "flag" }]
```

### `marker:add` / `marker:remove`
Marker sync events relayed to all players.

### `voice:joined` / `voice:left`
Another player joined or left voice.

### `voice:attenuation`
Your local attenuation map for nearby speakers.
```json
{
  "targets": [
    { "id": "socket-id", "distance": 12, "tier": { "maxTiles": 15, "volume": 0.75, "lowPassHz": null } }
  ]
}
```

---

## Config

See `server/config.js`. All values overridable via environment variables.

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Server port |
| `VOICE_ENABLED` | `true` | Enable/disable voice module |
| `MARKER_PERMISSION` | `all` | Who can add markers: `all`, `party`, `staff` |
