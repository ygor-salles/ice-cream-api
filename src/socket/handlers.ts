/* eslint-disable no-console */
import { Server, Socket } from 'socket.io';

export const registerSocketHandlers = (io: Server, socket: Socket) => {
  socket.on('joinRoom', (room: string) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
    socket.to(room).emit('message', `User ${socket.id} joined room ${room}`);
  });

  socket.on('message', ({ room, message }) => {
    console.log(`Message to room ${room}: ${message}`);
    io.to(room).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
};
