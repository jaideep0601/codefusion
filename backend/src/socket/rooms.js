const roomUsers = new Map();
const roomCode = new Map();

function getUsers(roomId) {
  return Array.from(roomUsers.get(roomId)?.values() || []);
}

function removeUser(socketId) {
  for (const [roomId, users] of roomUsers.entries()) {
    if (users.has(socketId)) {
      users.delete(socketId);

      if (users.size === 0) {
        roomUsers.delete(roomId);
        roomCode.delete(roomId);
      }

      return roomId;
    }
  }

  return null;
}

export function registerRoomHandlers(io) {
  io.on('connection', (socket) => {
    socket.on('room:join', ({ roomId, name }) => {
      if (!roomId) {
        return;
      }

      const normalizedRoomId = roomId.trim();
      socket.join(normalizedRoomId);

      if (!roomUsers.has(normalizedRoomId)) {
        roomUsers.set(normalizedRoomId, new Map());
      }

      roomUsers.get(normalizedRoomId).set(socket.id, {
        id: socket.id,
        name: name?.trim() || 'Guest',
      });

      socket.emit('code:update', roomCode.get(normalizedRoomId) || '');
      io.to(normalizedRoomId).emit('room:users', getUsers(normalizedRoomId));
    });

    socket.on('code:change', ({ roomId, code }) => {
      if (!roomId || typeof code !== 'string') {
        return;
      }

      const normalizedRoomId = roomId.trim();
      roomCode.set(normalizedRoomId, code);
      socket.to(normalizedRoomId).emit('code:update', code);
    });

    socket.on('disconnect', () => {
      const roomId = removeUser(socket.id);

      if (roomId) {
        io.to(roomId).emit('room:users', getUsers(roomId));
      }
    });
  });
}
