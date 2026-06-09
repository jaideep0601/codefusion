# Architecture

CodeFusion is split into a React frontend and a Node.js backend.

## Frontend

- Vite powers local development and builds.
- React renders the coding room interface.
- Socket.IO Client keeps room participants and editor content synchronized.
- Monaco Editor provides the code editing surface.

## Backend

- Express exposes REST endpoints for health checks and room lookup.
- Socket.IO manages real-time room events.
- Mongoose models support persistent room data in MongoDB.

## Real-Time Events

| Event | Direction | Purpose |
| --- | --- | --- |
| `room:join` | Client to server | Join a collaborative coding room. |
| `room:users` | Server to client | Broadcast connected participants. |
| `code:change` | Client to server | Send editor changes for a room. |
| `code:update` | Server to client | Receive the latest room code. |
