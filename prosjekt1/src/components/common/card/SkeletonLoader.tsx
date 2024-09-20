import styles from './styles/SkeletonLoader.module.css';

const SkeletonLoader = () => {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonDetails}>
                <div className={styles.skeletonIndex}></div>
                <div className={styles.skeletonName}></div>
                <div className={styles.skeletonBadges}></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
