import styles from './FileDisplay.module.css';

export default function FileDisplay({ fileName, onClick }){
	return(
		<div
			className={styles.title}
			onClick={() => onClick(fileName)}
			role="button"
			tabIndex={0}
		>
			<span className={styles.fileName}>{fileName}</span>
		</div>
	);
}
