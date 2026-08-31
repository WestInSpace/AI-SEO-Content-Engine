import { useState } from 'react';
import styles from './ContentDisplay.module.css';

export default function ContentDisplay({ data }) {
	const [activeTab, setActiveTab] = useState('social');

	if (!data) return null;

	return (
		<div className={styles.card}>
			<div className={styles.tabs}>
				<button
					onClick={() => setActiveTab('social')}
					className={`${styles.tab} ${activeTab === 'social' ? styles.activeTab : ''}`}
				>
					Social Media
				</button>
				<button
					onClick={() => setActiveTab('blog')}
					className={`${styles.tab} ${activeTab === 'blog' ? styles.activeTab : ''}`}
				>
					Blog Article
				</button>
				<button
					onClick={() => setActiveTab('youtube')}
					className={`${styles.tab} ${activeTab === 'youtube' ? styles.activeTab : ''}`}
				>
					YouTube Script
				</button>
			</div>

			<div className={styles.content}>
				{activeTab === 'social' && (
					<div>
						<span className={styles.platformBadge}>{data.socialMediaPost.platform}</span>
						<p className={styles.bodyText}>{data.socialMediaPost.postText}</p>
						<div className={styles.hashtagContainer}>
							{data.socialMediaPost.hashtags.map((tag, i) => (
								<span key={i} className={styles.hashtag}>#{tag.replace(/^#/, '')}</span>
							))}
						</div>
					</div>
				)}

				{activeTab === 'blog' && (
					<div>
						<h2 className={styles.sectionTitle}>{data.blogArticle.title}</h2>
						<p className={styles.metaBox}>
							<strong>Meta Description:</strong> {data.blogArticle.metaDescription}
						</p>
						<div className={styles.bodyText}>{data.blogArticle.body}</div>
					</div>
				)}

				{activeTab === 'youtube' && (
					<div>
						<h2 className={styles.sectionTitle}>{data.youtubeScript.title}</h2>
						<div className={styles.subSection}>
							<p className={styles.subLabel}>Hook</p>
							<p>{data.youtubeScript.hook}</p>
						</div>
						<div className={styles.subSection}>
							<p className={styles.subLabel}>Outline</p>
							<ul className={styles.list}>
								{data.youtubeScript.outline.map((item, i) => (
									<li key={i}>{item}</li>
								))}
							</ul>
						</div>
						<div className={styles.subSection}>
							<p className={styles.subLabel}>Script</p>
							<div className={styles.bodyText}>{data.youtubeScript.scriptBody}</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
