import PokemonGrid from '@/components/pokemon/PokemonGrid';
import useFavorites from '@/hooks/useFavorites';
import { useEffect, useState } from 'react';

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

    return (
        <div>
            <h1>Favorites</h1>
            <PokemonGrid pokemons={favoritePokemons} onFavoriteToggle={handleFavoriteToggle} />
        </div>
    );
};

export default Favorites;
