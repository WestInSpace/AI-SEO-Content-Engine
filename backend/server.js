import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import geminiRouter from './routes/geminiRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/response', geminiRouter); //mount the router to /api/response

app.listen(PORT, () => {
	console.log(`Backend server running at http://localhost:${PORT}/api/response/gemini`);
});
