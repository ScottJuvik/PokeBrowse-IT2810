import { MinimalPokemon, Pokemon } from '@/interfaces/pokemon';
import { cleanUpStorage } from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const fetchPokemon = async (nameOrId: string | number) => {
    const cachedData = sessionStorage.getItem(`pokemon-${nameOrId}`);
    if (cachedData) {
        try {
            return JSON.parse(cachedData);
        } catch (error) {
            console.error('Failed to parse cached Pokémon data:', error);
            sessionStorage.removeItem(`pokemon-${nameOrId}`);
        }
    }

    const url = `${POKEAPI_BASE_URL}/pokemon/${nameOrId}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to fetch Pokémon: ${nameOrId}`);
    }

    const data: Pokemon = await res.json();

    const minimalData: MinimalPokemon = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.other['official-artwork'].front_default,
        types: data.types.map(typeObj => typeObj.type.name),
        stats: data.stats.map(statObj => ({
            name: statObj.stat.name,
            value: statObj.base_stat
        })),
    };

    try {
        sessionStorage.setItem(`pokemon-${nameOrId}`, JSON.stringify(minimalData));
    } catch (error) {
        if ((error as Error).name === 'QuotaExceededError') {
            console.warn('Storage limit reached, cleaning up...');
            cleanUpStorage();
            sessionStorage.setItem(`pokemon-${nameOrId}`, JSON.stringify(minimalData));
        } else {
            console.error('Failed to cache Pokémon data:', error);
        }
    }

    return minimalData;
};

export const usePokemon = (nameOrId: string | number) => {
    return useQuery({
        queryKey: ['pokemon', nameOrId],
        queryFn: () => fetchPokemon(nameOrId),
        enabled: !!nameOrId,
        staleTime: 1000 * 60 * 60, // 1 hour
        refetchOnWindowFocus: false,
    });
};
