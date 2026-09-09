import { useState } from 'react';
import styles from './ApiKeyModal.module.css';

export default function ApiKeyModal({ onSave }){
	const [keyInput, setKeyInput] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(!keyInput.trim()) return;

		setLoading(true);
		await onSave(keyInput.trim());
		setLoading(false);
	};

	return(
		<div classname={styles.modalOverlay}>
			<div className={styles.modalCard}>
				<h2 className={styles.header}>Setup Required</h2>
				<p>Please enter your Google API Key to use this application:</p>

				<form onSubmit={handleSubmit}>
					<input
						type="password"
						value={keyInput}
						onChange={(e) => setKeyInput(e.target.value)}
						placeholder="AIzaSy..."
						required
						className={styles.input}
					/>
					<button type="submit" disabled={loading} className={styles.button}>
						{loading ? 'Saving...' : 'Save API Key'}
					</button>
				</form>
			</div>
		</div>
	);
}
