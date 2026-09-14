import { useState } from 'react';
import styles from './ContentDisplay.module.css';

export default function ContentDisplay({ data }) {
	const [activeTab, setActiveTab] = useState('social');

	if (!data) return null;

	return (
		<div className={styles.card}>
			<h2 className={styles.bodyText}>
				Keywords: {data.keywordsUsed.join(', ')}
			</h2>
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
						<span className={styles.platformBadge}>{data.generated.socialMediaPost.platform}</span>
						<p className={styles.bodyText}>{data.generated.socialMediaPost.postText}</p>
						<div className={styles.hashtagContainer}>
							{data.generated.socialMediaPost.hashtags.map((tag, i) => (
								<span key={i} className={styles.hashtag}>#{tag.replace(/^#/, '')}</span>
							))}
						</div>
					</div>
				)}

				{activeTab === 'blog' && (
					<div>
						<h2 className={styles.sectionTitle}>{data.generated.blogArticle.title}</h2>
						<p className={styles.metaBox}>
							<strong>Meta Description:</strong> {data.generated.blogArticle.metaDescription}
						</p>
						<div className={styles.bodyText}>{data.generated.blogArticle.body}</div>
					</div>
				)}

				{activeTab === 'youtube' && (
					<div>
						<h2 className={styles.sectionTitle}>{data.generated.youtubeScript.title}</h2>
						<div className={styles.subSection}>
							<p className={styles.subLabel}>Hook</p>
							<p>{data.generated.youtubeScript.hook}</p>
						</div>
						<div className={styles.subSection}>
							<p className={styles.subLabel}>Outline</p>
							<ul className={styles.list}>
								{data.generated.youtubeScript.outline.map((item, i) => (
									<li key={i}>{item}</li>
								))}
							</ul>
						</div>
						<div className={styles.subSection}>
							<p className={styles.subLabel}>Script</p>
							<div className={styles.bodyText}>{data.generated.youtubeScript.scriptBody}</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
