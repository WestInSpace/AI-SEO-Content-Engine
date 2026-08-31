import { useState } from 'react';
import KeywordInput from '../../components/KeywordInput/KeywordInput.jsx';
import ContentDisplay from '../../components/ContentDisplay/ContentDisplay.jsx';
import styles from './MainPage.module.css';

const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || 5000;

export default function MainPage() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);

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
			<h1 className={styles.title}>SEO Content Engine</h1>
			<p className={styles.subtitle}>
				Enter target keywords to generate a social media post, blog article, and YouTube script.
			</p>

			<KeywordInput onSubmit={handleGenerate} loading={loading} />

			{error && <div className={styles.errorMessage}>{error}</div>}

			<ContentDisplay data={result} />
		</div>
	);
}
