import Loader from '@/components/common/loader/Loader';
import { ArrowRight } from '@carbon/icons-react';
import { useEffect, useState } from 'react';
import styles from './home.module.css';
import background_backup_desktop from '/images/may_waterfall_desktop.jpg';
import background_mobile from '/images/may_waterfall_mobile.jpg';
import background_desktop from '/videos/may_waterfall.mp4';
import SearchBar, { SearchBarSize } from '@/components/common/searchbar/SearchBar';

const Home = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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

    const handleSearch = (query: string) => {
        console.log('Search query:', query);
    };

    const loadAsset = (element: HTMLVideoElement | HTMLImageElement): Promise<void> => {
        return new Promise((resolve, reject) => {
            element.onload = () => resolve();
            element.onerror = () => reject();
            if (element instanceof HTMLVideoElement) {
                element.onloadeddata = () => resolve(); // For video
            }
        });
    };

    // Load background depending on device
    useEffect(() => {
        const loadBackground = async () => {
            const video = document.getElementById('backgroundVideo') as HTMLVideoElement;
            const image = document.getElementById('backgroundImage') as HTMLImageElement;

            try {
                if (isMobile && image) {
                    await loadAsset(image);
                } else if (video) {
                    await loadAsset(video);
                }
            } catch {
                setVideoFailed(true);
            }

            setIsLoading(false);
        };

        loadBackground();
    }, [isMobile]);

    if (isLoading) {
        return (
            <div className={styles.homeContainer}>
                <Loader />
            </div>
        );
    }

    return (
        <div className={styles.homeContainer}>
            {isMobile ? (
                <img
                    id="backgroundImage"
                    src={background_mobile}
                    alt="Mobile Background"
                    className={styles.background}
                />
            ) : (
                <div className={styles.backgroundWrapper}>
                    {!videoFailed ? (
                        <video id="backgroundVideo" autoPlay loop muted preload="auto" className={styles.background}>
                            <source src={background_desktop} type="video/mp4" />
                        </video>
                    ) : (
                        <img
                            id="backgroundImage"
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
                    <SearchBar onSearch={handleSearch} size={SearchBarSize.Large} />
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
