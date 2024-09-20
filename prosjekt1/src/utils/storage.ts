export const cleanUpStorage = () => {
    const keys = Object.keys(localStorage);
    keys.forEach((key, index) => {
        if (key.startsWith('pokemon-') && index % 5 === 0) {
            // Remove every 5th item (you can implement more sophisticated logic)
            localStorage.removeItem(key);
        }
    });
};
