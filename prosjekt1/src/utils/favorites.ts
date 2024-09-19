const FAVORITES_KEY = 'favorites';

export const getFavorites = (): number[] => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const saveFavorites = (favorites: number[]): void => {
    const sortedFavorites = [...favorites].sort((a, b) => a - b);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(sortedFavorites));
};

export const addFavorite = (pokemonId: number): void => {
    const favorites = getFavorites();
    if (!favorites.includes(pokemonId)) {
        favorites.push(pokemonId);
        saveFavorites(favorites);
    }
};

export const removeFavorite = (pokemonId: number): void => {
    const favorites = getFavorites().filter(id => id !== pokemonId);
    saveFavorites(favorites);
};
