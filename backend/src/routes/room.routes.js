import { Router } from 'express';
import { Room } from '../models/Room.js';

const router = Router();

router.post('/', async (request, response, next) => {
  try {
    const roomId = request.body.roomId?.trim();

    if (!roomId) {
      return response.status(400).json({ message: 'roomId is required' });
    }

    const room = await Room.findOneAndUpdate(
      { roomId },
      {
        $setOnInsert: {
          roomId,
          title: request.body.title?.trim() || 'Untitled Room',
          code: request.body.code || '',
          language: request.body.language || 'javascript',
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    response.status(201).json({ room });
  } catch (error) {
    next(error);
  }
});

router.get('/:roomId', async (request, response, next) => {
  try {
    const room = await Room.findOne({ roomId: request.params.roomId });

    if (!room) {
      return response.status(404).json({ message: 'Room not found' });
    }

    response.json({ room });
  } catch (error) {
    next(error);
  }
});

export default router;
