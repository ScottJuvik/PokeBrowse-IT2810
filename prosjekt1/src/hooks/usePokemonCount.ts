const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const fetchPokemonCount = async () => {
    const url = `${POKEAPI_BASE_URL}/pokemon-species?limit=1`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch Pokémon species count');
    }

    const data = await res.json();
    return data.count;
};

import { useQuery } from '@tanstack/react-query';

export const usePokemonCount = () => {
    return useQuery({
        queryKey: ['pokemon-count'],
        queryFn: fetchPokemonCount,
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
    });
};
