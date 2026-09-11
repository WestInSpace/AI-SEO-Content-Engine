import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FileDisplay from '../../components/FileDisplay/FileDisplay.jsx';
import ContentDisplay from '../../components/ContentDisplay/ContentDisplay.jsx';
import styles from './HistoryPage.module.css';

const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || 5000;

export default function HistoryPage() {
	const navigate = useNavigate();
	const [historyFiles, setHistoryFiles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedFile, setSelectedFile] = useState(null);
	const [fileContent, setFileContent] = useState(null);
	const [contentLoading, setContentLoading] = useState(false);
	const [error, setError] = useState(null);

	//fetch history files on mount
	useEffect(() => {
		const fetchHistoryFiles = async () => {
			try{
				setLoading(true);
				const response = await fetch(`http://localhost:${BACKEND_PORT}/api/history`);
				const data = await response.json();

				if(data.success){
					setHistoryFiles(data.fileNames || []);
				}else{
					setError(data.error || 'Failed to fetch history files.');
				}

			}catch(err){
				console.error('Error fetching history:', err);
				setError(data.error || 'Failed to fetch history files.');
			}finally{
				setLoading(false);
			}
		};

		fetchHistoryFiles();
	}, []);

	const handleDeleteFile = async (fileName) => {
		if(!window.confirm(`Are you sure you want to delete: ${fileName}`)){
			return;
		}

		try{
			const response = await fetch(`http://localhost:${BACKEND_PORT}/api/history/delete`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ fileName: fileName })
			});

			const data = await response.json();

			if(data.success){
				//Remove file from UI state array
				setHistoryFiles(prevFiles => prevFiles.filter(name => name !== fileName));

				//Clear the content display if the delted file was currently selected
				if(selectedFile === fileName){
					setSelectedFile(null);
					setFileContent(null);
				}
			}else{
				setError(data.error || 'Failed to delete file.');
			}

		}catch(err){
			console.error('Error deleting file:', err);
			setError('Could not connect to backend server to delete file.');
		}
	};

	const handleFileClick = async (fileName) => {
		//console.log('Selected history file: ', fileName);
		try{
			setSelectedFile(fileName);
			setContentLoading(true);

			const response = await fetch(`http://localhost:${BACKEND_PORT}/api/history`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ fileName })
			});

			const data = await response.json();

			if(data.success){
				setFileContent(data.data);
			}else{
				setError(data.error || 'Failed to load content for selected file.');
			}

		}catch(err){
			console.error('Error fetching file content:', err);
			setError('Error loading content from backend.');
		}finally{
			setContentLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<h2
				className={styles.link}
				onClick={() => navigate('/')}
				role="button"
				tabIndex={0}
			>
				&larr; Back to MainPage
			</h2>
			<h1 className={styles.title}>SEO AI Content Engine</h1>
			<h2 className={styles.subtitle}>History Page</h2>
			<h2 className={styles.disclaimer}>Note: AI is used to generate results. Results may be unexpected or inaccurate.</h2>

			{/* Loading & Error States */}
			{loading && <p className={styles.infoText}>Loading history files...</p>}
			{error && <p className={styles.errorText}>{error}</p>}

			{/* Empty State */}
			{!loading && !error && historyFiles.length === 0 && (
				<p className={styles.infoText}>No history records found.</p>
			)}

			{/* List of File Tiles */}
			{!loading && !error && historyFiles.length > 0 && (
				<div className={styles.fileList}>
					{historyFiles.map((fileName) => (
						<FileDisplay
							key={fileName}
							fileName={fileName}
							onClick={handleFileClick}
							onDelete={handleDeleteFile}
						/>
					))}
				</div>
			)}

			{/* Content Display for Selected File */}
			{contentLoading && <p className={styles.infoText}>Loading generated content...</p>}
			{!contentLoading && fileContent && (
				<div className={styles.contentContainer}>
					<h3>Viewing: {selectedFile}</h3>
					<ContentDisplay data={fileContent} />
				</div>
			)}

		</div>
	);
}
