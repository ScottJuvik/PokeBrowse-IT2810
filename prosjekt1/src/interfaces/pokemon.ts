export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: {
        type: {
            name: string;
        };
    }[];

    stats: {
        base_stat: number,
        stat: {
          name: string,
        }
      }[];
}

export interface Stat {
    name: string,
    value: number,
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListResult[];
}

export interface PokemonListResult {
    name: string;
    url: string;
}

export interface PokemonListEntry {
    name: string;
    url: string;
}

export interface MinimalPokemon {
    id: number;
    name: string;
    sprite: string;
    types: string[];
    stats: {
        name: string;
        value: number;
    }[];
}
