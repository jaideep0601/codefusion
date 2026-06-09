import cors from 'cors';
import express from 'express';
import healthRoutes from './routes/health.routes.js';
import roomRoutes from './routes/room.routes.js';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
      credentials: true,
    })
  );
  app.use(express.json());

  app.use('/api/health', healthRoutes);
  app.use('/api/rooms', roomRoutes);

  return app;
}
