export const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
};

export const formatPokemonName = (name: string) => {
    const correctName = name.split('-').join(' ');
    return toTitleCase(correctName);
};
