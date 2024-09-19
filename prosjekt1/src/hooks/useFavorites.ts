import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFavorites, addFavorite, removeFavorite } from '@/utils/favorites';
import { fetchPokemon } from '@/hooks/usePokemon';
import { getImageBase64 } from '@/utils/images';

const fetchAllFavoritePokemon = async (favoriteIds: number[]) => {
    const pokemonPromises = favoriteIds.map(async pokemonId => {
        const cachedData = sessionStorage.getItem(`pokemon-${pokemonId}`);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        try {
            const data = await fetchPokemon(pokemonId);

            // Convert the image to Base64 and store it
            if (data.sprites.front_default) {
                try {
                    const base64Image = await getImageBase64(data.sprites.front_default);
                    data.sprites.front_default = base64Image;
                } catch (error) {
                    console.error(`Failed to convert image for Pokémon ${pokemonId} to Base64:`, error);
                }
            }

            sessionStorage.setItem(`pokemon-${pokemonId}`, JSON.stringify(data));
            return data;
        } catch (error) {
            console.error(`Failed to fetch Pokémon ${pokemonId}:`, error);
            return null;
        }
    });

    const results = await Promise.all(pokemonPromises);
    return results.filter(pokemon => pokemon !== null);
};

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<number[]>(getFavorites());

    const reloadFavorites = useCallback(() => {
        setFavorites(getFavorites());
    }, []);

    const {
        data: favoritePokemonData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['favorite-pokemons', favorites],
        queryFn: () => fetchAllFavoritePokemon(favorites),
        enabled: favorites.length > 0,
        staleTime: 1000 * 60, // 1 minute
    });

    const toggleFavorite = (pokemonId: number) => {
        if (favorites.includes(pokemonId)) {
            removeFavorite(pokemonId);
        } else {
            addFavorite(pokemonId);
        }
        reloadFavorites();
    };

    return {
        favorites,
        favoritePokemonData,
        isLoading,
        error,
        reloadFavorites,
        toggleFavorite,
    };
};
