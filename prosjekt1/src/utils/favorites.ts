const FAVORITES_KEY = 'favorites';

export const addFavorite = (pokemonId: number) => {
    const favorites = getFavorites();
    if (!favorites.includes(pokemonId)) {
        favorites.push(pokemonId);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
};

export const removeFavorite = (pokemonId: number) => {
    let favorites = getFavorites();
    favorites = favorites.filter(id => id !== pokemonId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const getFavorites = (): number[] => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
};