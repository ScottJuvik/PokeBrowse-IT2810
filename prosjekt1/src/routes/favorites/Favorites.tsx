import PokemonGrid from '@/components/pokemon/PokemonGrid';
import useFavorites from '@/hooks/useFavorites';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useEffect, useState } from 'react';
import styles from './Favorites.module.css';

const Favorites = () => {
    const { favorites } = useFavorites();
    const [favoritePokemons, setFavoritePokemons] = useState<number[]>(favorites);

    useEffect(() => {
        setFavoritePokemons(favorites);
    }, [favorites]);

    const handleFavoriteToggle = (idOrName: number | string, isFavorite: boolean) => {
        if (!isFavorite) {
            setFavoritePokemons(prevFavorites => prevFavorites.filter(fav => fav !== idOrName));
        }
    };

    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className={styles.favoritesContainer}>
            <main>
                {isMobile && <h1 className={styles.title}>Favorites</h1>}
                <PokemonGrid pokemons={favoritePokemons} onFavoriteToggle={handleFavoriteToggle} />
            </main>
        </div>
    );
};

export default Favorites;
