import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

import express from 'express';
import cors from 'cors';
import geminiRouter from './routes/geminiRouter.js';
import historyRouter from './routes/historyRouter.js';

const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 5001;
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;

app.use(cors({
	origin: `http://localhost:${FRONTEND_PORT}`
}));

app.use(express.json());
app.use('/api', geminiRouter); //mount the gemini router to /api
app.use('/api', historyRouter); //mount the history router to /api

app.listen(BACKEND_PORT, () => {
	console.log(`Backend server running at http://localhost:${BACKEND_PORT}/api`);
});
