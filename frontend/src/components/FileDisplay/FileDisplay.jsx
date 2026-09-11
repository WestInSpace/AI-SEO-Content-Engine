import styles from './FileDisplay.module.css';

export default function FileDisplay({ fileName, onClick, onDelete }){

	const handleDelete = (e) => {
		e.stopPropagation(); // Stops the outer div onClick from triggering
		onDelete(fileName);
	};

	return(
		<div
			className={styles.tile}
			onClick={() => onClick(fileName)}
			role="button"
			tabIndex={0}
		>
			<div>
				<span className={styles.fileName}>{fileName}</span>
			</div>

			<button
				className={styles.deleteButton}
				onClick={handleDelete}
				title="Delete File"
			>
				Delete File
			</button>

		</div>
	);
}
