import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';

import { connectDB } from './config/database';
import consultaRoutes from './routes/consulta.routes';

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/consulta', consultaRoutes);

app.get('/ping', (_req, res) => {
  res.json({ ok: true });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();