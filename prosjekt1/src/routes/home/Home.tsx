import SearchBar from '@/components/common/searchbar/SearchBar';
import Loader from '@components/common/loader/Loader';
import { useRandomPokemonId } from '@hooks/useRandomPokemonId';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import background_backup_desktop from '/images/may_waterfall_desktop.jpg';
import background_mobile from '/images/may_waterfall_mobile.jpg';
import background_desktop from '/videos/may_waterfall.mp4';

const Home = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [videoFailed, setVideoFailed] = useState(false);
    const [pokemon, setPokemon] = useState<string>('');
    const { refetch, isLoading: isLoadingId } = useRandomPokemonId();

    const navigate = useNavigate();

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

    const loadAsset = (element: HTMLVideoElement | HTMLImageElement): Promise<void> => {
        return new Promise((resolve, reject) => {
            element.onload = () => resolve();
            element.onerror = () => reject();
            if (element instanceof HTMLVideoElement) {
                element.onloadeddata = () => resolve(); // For video
            }
        });
    };

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

    const handleSearchClick = () => {
        if (pokemon.trim()) {
            navigate(`/pokemon/${pokemon}`);
        }
    };

    const handleRandomClick = async () => {
        const { data } = await refetch();

        if (data) {
            navigate(`/pokemon/${data}`);
        }
    };

    const handlePokemonClick = () => {
        navigate('/pokemon');
    };

    if (isLoading || isLoadingId) {
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
                    <SearchBar onSearch={handleSearchClick} searchQuery={pokemon} setSearchQuery={setPokemon} />
                    <div className={styles.buttonWrapper}>
                        <button
                            type="button"
                            name="random"
                            className={styles.random}
                            onClick={handleRandomClick}
                            disabled={isLoadingId}
                        >
                            Random
                        </button>
                        <button type="button" name="pokemon" className={styles.pokemon} onClick={handlePokemonClick}>
                            Pokémon
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
