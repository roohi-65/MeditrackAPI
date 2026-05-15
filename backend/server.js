import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import medicineRoutes     from './routes/medicine.routes.js';
import appointmentRoutes  from './routes/appointment.routes.js';
import authRoutes         from './routes/auth.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',         authRoutes);
app.use('/api/medicines',    medicineRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/', (req, res) => res.json({ message: 'MediTrack API Running ✅' }));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB Connected ✅');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error(err));