import { useQuery } from '@tanstack/react-query';

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

export const fetchRandomPokemonId = async (): Promise<number> => {
    const response = await fetch(POKEAPI_URL);
    const data = await response.json();
    const totalPokemon = data.count;

    const randomId = Math.floor(Math.random() * totalPokemon) + 1;

    return randomId;
};

export const useRandomPokemonId = () => {
    return useQuery({
        queryKey: ['random-pokemon-id'],
        queryFn: () => fetchRandomPokemonId(),
        staleTime: 1000 * 60, // 1 minute
        enabled: false,
    });
};
