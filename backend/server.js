import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import noteRouter from './routes/noteRoute.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Database Connection
connectDB();

app.use('/api/user' ,userRouter)
app.use('/api/note' ,noteRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Root route to handle GET /
app.get('/', (req, res) => {
    res.send('Welcome to the backend API!');
});