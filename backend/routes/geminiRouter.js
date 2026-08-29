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

router.get('/gemini', async (req, res) => {
	try{

		const apiKey = process.env.GEMINI_API_KEY;

		if(!apiKey){
			throw new Error('GEMINI_API_KEY is not defined in process.env');
		}

		//initialize the Gemini API client
		const ai = new GoogleGenAI({ apiKey });


		//hardcoded keywords for testing, to be swaped for req.body or req.query later
		const keywords = ['AI productivity tools', 'automation for small business', 'SEO optimization 2026'];

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
				temperature: 0.7,
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
		return res.status(500).json({
			success: false,
			error: 'Failed to generate SEO content.',
			details: err.message
		});
	}

});

export default router;



