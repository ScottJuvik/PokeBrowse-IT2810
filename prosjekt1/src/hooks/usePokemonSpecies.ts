import { useQuery } from '@tanstack/react-query';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const fetchPokemonSpecies = async (nameOrId: string | number) => {
    const url = `${POKEAPI_BASE_URL}/pokemon-species/${nameOrId}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch Pokémon species');
    }

    const data = await res.json();

    const englishFlavorTexts = data.flavor_text_entries.filter(
        (entry: { language: { name: string }; version: { name: string } }) => entry.language.name === 'en'
    );

    const lastFlavorText =
        englishFlavorTexts.length > 0
            ? englishFlavorTexts[englishFlavorTexts.length - 1].flavor_text
            : 'No flavor text found';

    return lastFlavorText;
};

export const usePokemonSpecies = (nameOrId: string | number) => {
    return useQuery({
        queryKey: ['pokemon-species', 'flavor-text', nameOrId],
        queryFn: () => fetchPokemonSpecies(nameOrId),
        enabled: !!nameOrId,
        staleTime: 1000 * 60 * 60, // 1 Hour
    });
};
