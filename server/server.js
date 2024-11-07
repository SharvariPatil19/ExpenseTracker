// server/server.js
import express, { json } from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import expensesRoutes from './routes/expenses.js';
import dotenv from 'dotenv';

dotenv.config();
console.log('MongoDB URI:', process.env.MONGO_URI);

const app = express();
connectDB();


app.use(cors());
app.use(express.json());
app.use('/api/expenses', expensesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
