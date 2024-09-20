import { addFavorite, getFavorites, removeFavorite } from '@utils/favorites';
import { useEffect, useState } from 'react';

const useFavorites = () => {
    const [favorites, setFavorites] = useState<number[]>(getFavorites());

    useEffect(() => {
        const handleStorageChange = () => {
            setFavorites(getFavorites());
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const toggleFavorite = (pokemonId: number) => {
        if (favorites.includes(pokemonId)) {
            removeFavorite(pokemonId);
        } else {
            addFavorite(pokemonId);
        }
        setFavorites(getFavorites());
    };

    return { favorites, toggleFavorite };
};

export default useFavorites;
