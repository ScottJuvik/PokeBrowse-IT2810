import { useQuery } from '@tanstack/react-query';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const fetchPokemonList = async (limit = 20, page = 0) => {
    const offset = page * limit;
    const cacheKey = `pokemon-list-${offset}-${limit}`;

    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
        console.log(`Returning cached data for page: ${page}`);
        return JSON.parse(cachedData);
    }

    console.log(`Fetching new data from API for page: ${page}`);
    const url = `${POKEAPI_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch Pokémon list');
    }

    const data = await response.json();
    sessionStorage.setItem(cacheKey, JSON.stringify(data));

    return data;
};

export const usePokemonList = (page: number, limit: number) => {
    return useQuery({
        queryKey: ['pokemon-list', page, limit],
        queryFn: () => fetchPokemonList(limit, page),
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 2,
        enabled: page >= 0,
        refetchOnWindowFocus: false,
    });
};
