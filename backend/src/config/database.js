import mongoose from 'mongoose';

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn('MONGODB_URI is not set. Starting without a database connection.');
    return;
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
}
