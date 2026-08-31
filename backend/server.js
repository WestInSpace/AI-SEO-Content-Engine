import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

import express from 'express';
import cors from 'cors';
import geminiRouter from './routes/geminiRouter.js';

const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 5000;
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;

app.use(cors({
	origin: `http://localhost:${FRONTEND_PORT}`
}));

app.use(express.json());
app.use('/api/response', geminiRouter); //mount the router to /api/response

app.listen(BACKEND_PORT, () => {
	console.log(`Backend server running at http://localhost:${BACKEND_PORT}/api/response/gemini`);
});
