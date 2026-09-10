import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import { GEMINI_CONFIG } from '../config/geminiConfig.js';

const router = express.Router();

//define the expected json structure from gemini
const contentSchema = {
	type: Type.OBJECT,
	properties: {
		socialMediaPost: {
			type: Type.OBJECT,
			properties: {
				platform: { type: Type.STRING },
				postText: { type: Type.STRING },
				hashtags: {
					type: Type.ARRAY,
					items: { type: Type.STRING }
				}
			},
			required: ['platform', 'postText', 'hashtags']
		},
		blogArticle: {
			type: Type.OBJECT,
			properties: {
				title: { type: Type.STRING },
				metaDescription: {type: Type.STRING },
				body: { type: Type.STRING}
			},
			required: ['title', 'metaDescription', 'body']
		},
		youtubeScript: {
			type: Type.OBJECT,
			properties: {
				title: { type: Type.STRING },
				hook: { type: Type.STRING },
				outline: {
					type: Type.ARRAY,
					items: { type: Type.STRING }
				},
				scriptBody: { type: Type.STRING }
			},
			required: ['title', 'hook', 'outline', 'scriptBody']
		}
	},
	required: ['socialMediaPost', 'blogArticle', 'youtubeScript']
};

//GET Route: Health check only, no api call
router.get('/gemini', (req, res) => {
	return res.status(200).json({
		status: 'online',
		message: 'Gemini endpoint is ready. Submit a POST request with keywords to generate content'
	});
});

//POST Route: Execute Gemini request
router.post('/gemini', async (req, res) => {
	try{
		const { keywords } = req.body;

		//Reject request if no keywords array or empty payload is passed
		if(!keywords || !Array.isArray(keywords) || keywords.length === 0){
			console.error('No keywords provided');
			return res.status(400).json({
				success: false,
				error: 'Keywords are required to generate content.'
			});
		}

		const apiKey = process.env.GEMINI_API_KEY;
		if(!apiKey){
			console.error('No Gemini api key provided in .env');
			throw new Error('GEMINI_API_KEY is not defined in process.env');
		}

		const ai = new GoogleGenAI({ apiKey });

		const prompt = `
			You are an expert SEO strategist and content generator.
            Generate a social media post, a blog article, and a YouTube video script optimized for search engines based on these keywords:
            ${keywords.join(', ')}
		`;

		const response = await ai.models.generateContent({
			model: GEMINI_CONFIG.model,
			contents: prompt,
			config: {
				responseMimeType: 'application/json',
				responseSchema: contentSchema,
			}
		});

		const jsonOutput = JSON.parse(response.text);

		return res.status(200).json({
			success: true,
			keywordsUsed: keywords,
			data: jsonOutput
		});
	} catch (err) {
		console.error('Error generating content:', err);

		let userErrorMessage = 'Failed to generate SEO content';
		if(err.status === 503){
			userErrorMessage = 'Gemini servers are currently experiencing high demand. Please wait a moment and try again.';
		}else if (err.status === 400 || err.status === 403){
			userErrorMessage = 'Invalid API key or unauthorized request. Please check your settings.';
		}

		return res.status(500).json({
			success: false,
			error: userErrorMessage,
			details: err.message
		});
	}
});

export default router;



