import { useQuery } from "@tanstack/react-query";

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const fetchPokemon = async (nameOrId: string | number) => {
    const cachedData = sessionStorage.getItem(`pokemon-${nameOrId}`);
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    const url = `${POKEAPI_BASE_URL}/pokemon/${nameOrId}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch Pokémon');
    }

    const data = await res.json();

    sessionStorage.setItem(`pokemon-${nameOrId}`, JSON.stringify(data));

    return data;
}

export const usePokemon = (nameOrId: string | number) => {
    return useQuery({
        queryKey: ['pokemon', nameOrId],
        queryFn: () => fetchPokemon(nameOrId),
        enabled: !!nameOrId,
        staleTime: 1000 * 60, // 1 minute
    });
}