import express from 'express';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

//GET Route: return the names of all the history files
router.get('/history', (req, res) => {
	try{
		const historyDir = process.env.RESPONSE_HISTORY || path.join(__dirname, '../responseHistory');

		//Make sure the directoy exists
		if(!fs.existsSync(historyDir)){
			fs.mkdirSync(historyDir, { recursive: true });
			return res.status(200).json({
				success: true,
				fileNames: []
			});
		}

		//Read all the filenames in the directory
		const allFiles = fs.readdirSync(historyDir);

		// Filter to ignore hidden system files, put the newest timestamps first.
		const fileNames = allFiles.filter(file => !file.startsWith('.') && (file.endsWith('.json'))).sort().reverse();

		return res.status(200).json({
			success: true,
			fileNames: fileNames
		});
	}catch(err){
		console.error('Failed to read history directoy:', err);
		return res.status(500).json({
			success: false,
			error: 'Failed to retrieve history files',
			details: err.message
		});
	}
});


//POST Route: return the contents of a requested file
router.post('/history', async (req, res) => {
	try{
		const { fileName } = req.body;

		//Reject request if no fileName or empty payload is passed
		if(!fileName || typeof fileName !== 'string' || fileName.trim().length === 0){
			console.error('No fileName provided');
			return res.status(400).json({
				success: false,
				error: 'fileName is required to retrive history.'
			});
		}

		//Sanitise fileName
		const safeFileName = path.basename(fileName);

		//resolve base directory
		const historyDir = process.env.RESPONSE_HISTORY || path.join(__dirname, '../responseHistory');
        const filePath = path.join(historyDir, safeFileName);
		
		//Check if the file exists
		if(!fs.existsSync(filePath)){
			return res.status(404).json({
				success: false,
				error: `Requested history file: ${safeFileName} not found.`
			});
		}

		//read and parse file contents
		const rawContent = fs.readFileSync(filePath, 'utf8');
		const responsePayload = JSON.parse(rawContent);

		return res.status(200).json(responsePayload);

	} catch (err) {
		console.error('Error retrieving content:', err);

		let userErrorMessage = 'Failed to retrieve history content';
		if(err instanceof SyntaxError){
			userErrorMessage = 'The history file contains invalid JSON data.';
		}


		return res.status(500).json({
			success: false,
			error: userErrorMessage,
			details: err.message
		});
	}
});

export default router;



