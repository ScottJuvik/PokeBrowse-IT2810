import { ArrowRight } from '@carbon/icons-react';
import { useEffect, useState } from 'react';
import styles from './home.module.css';
import background_backup_desktop from '/images/may_waterfall_desktop.jpg';
import background_mobile from '/images/may_waterfall_mobile.jpg';
import background_desktop from '/videos/may_waterfall.mp4';

const Home = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [videoFailed, setVideoFailed] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return (
        <div className={styles.homeContainer}>
            {isMobile ? (
                <img src={background_mobile} alt="Mobile Background" className={styles.background} />
            ) : (
                <div className={styles.backgroundWrapper}>
                    {!videoFailed ? (
                        <video autoPlay loop muted className={styles.background} onError={() => setVideoFailed(true)}>
                            <source src={background_desktop} type="video/mp4" />
                        </video>
                    ) : (
                        <img
                            src={background_backup_desktop}
                            alt="Desktop Backup Background"
                            className={styles.background}
                        />
                    )}
                </div>
            )}

            <main className={styles.content}>
                <h1 className={styles.title}>
                    Poké<span>Browse</span>
                </h1>

                <div className={styles.interactives}>
                    <div className={styles.searchWrapper}>
                        <input type="text" placeholder="Search for a Pokémon" className={styles.searchInput} />
                        <button className={styles.searchButton}>
                            <ArrowRight size={isMobile ? 16 : 24} />
                        </button>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.random}>Random</button>
                        <button className={styles.pokemon}>Pokémon</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
