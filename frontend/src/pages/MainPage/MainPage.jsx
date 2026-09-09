import { useState, useEffect } from 'react';
import KeywordInput from '../../components/KeywordInput/KeywordInput.jsx';
import ContentDisplay from '../../components/ContentDisplay/ContentDisplay.jsx';
import ApiKeyModal from '../../components/ApiKeyModal/ApiKeyModal.jsx';
import styles from './MainPage.module.css';

const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || 5000;

export default function MainPage() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const [isConfigured, setIsConfigured] = useState(true);

	useEffect(() => {
		//Check for stored API Key when Electron loads the page
		if(window.electronAPI){
			window.electronAPI.getApiKey().then((key) => {
				if(key && key.trim().length > 0){
					setIsConfigured(true);
				}else{
					setIsConfigured(false);
				}
			});
		}
	}, []);

	const handleSaveApiKey = async (newKey) => {
		if(window.electronAPI){
			await window.electronAPI.saveApiKey(newKey);
			setIsConfigured(true);
		}
	};

	const handleGenerate = async (keywords) => {
		setLoading(true);
		setError(null);
		setResult(null);

		try {
			const res = await fetch(`http://localhost:${BACKEND_PORT}/api/response/gemini`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ keywords })
			});

			const data = await res.json();
			if (!res.ok){
				console.error('MainPage: Failed to fetch content');
				throw new Error(data.error || 'Failed to fetch content');
			}

			setResult(data.data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.container}>

			{/* Shows modal overlay if API Key is not set */}
			{!isConfigured && <ApiKeyModal onSave={handleSaveApiKey} />}
			
			<h1 className={styles.title}>SEO AI Content Engine</h1>
				<h2 className={styles.disclaimer}>Note: AI is used to generate results. Results may be unexpected or inaccurate.</h2>
			<div className={styles.headerRow}>
				{/* Handle Settings, change the API key */}
				<button
					onClick={() => setIsConfigured(false)}
					className={styles.settingsButton}
					title="Configure API Key"
				>
					Settings
				</button>
			</div>

			<p className={styles.subtitle}>
				Enter target keywords to generate a social media post, blog article, and a YouTube video script:
			</p>

			<KeywordInput onSubmit={handleGenerate} loading={loading} />

			{error && <div className={styles.errorMessage}>{error}</div>}

			<ContentDisplay data={result} />

		</div>
	);
}
