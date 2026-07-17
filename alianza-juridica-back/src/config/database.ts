// src/config/database.ts
import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('Falta MONGO_URI / MONGODB_URI en .env');
  process.exit(1);
}

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      family: 4
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};