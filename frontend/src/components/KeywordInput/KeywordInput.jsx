import { useState } from 'react';
import styles from './KeywordInput.module.css';

export default function KeywordInput({ onSubmit, loading }) {
	const [keywordInput, setKeywordInput] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!keywordInput.trim()) return;

		// Convert comma-separated string to clean array
		const keywords = keywordInput.split(',').map(k => k.trim()).filter(Boolean);
	onSubmit(keywords);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
				type="text"
				value={keywordInput}
				onChange={(e) => setKeywordInput(e.target.value)}
				placeholder="e.g. AI tools, productivity, automation"
				className={styles.input}
			/>
			<button type="submit" disabled={loading} className={styles.button}>
				{loading ? 'Generating...' : 'Generate'}
			</button>
		</form>
	);
}
