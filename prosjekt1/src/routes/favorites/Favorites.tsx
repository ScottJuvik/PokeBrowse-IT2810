import React, { useState, useEffect } from 'react';
import Card from '@/components/common/card/Card'; // Adjust the import path based on your project structure

// Example: Replace with your actual API endpoint or data fetching function
const fetchAllCards = async () => {
    // Fetch data from an API or use a static JSON file
    return [
        { index: 1, name: 'Bulbasaur', types: ['grass', 'poison'], imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
        { index: 4, name: 'Charmander', types: ['fire'], imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
        { index: 150, name: 'Mewtwo', types: ['psychic'], imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png' },
        // Add more cards as needed
    ];
};

const Favorites = () => {
    const [favoriteCards, setFavoriteCards] = useState<any[]>([]);

    // Function to load favorite cards
    const loadFavoriteCards = async () => {
        const allCards = await fetchAllCards(); // Fetch all cards data
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const favoriteCardData = allCards.filter(card => storedFavorites.includes(card.index));

        setFavoriteCards(favoriteCardData);
    };

    useEffect(() => {
        loadFavoriteCards(); // Load favorite cards on component mount
    }, []);

    const handleToggleFavorite = () => {
        loadFavoriteCards(); // Reload favorites when a card's favorite status is toggled
    };

    return (
        <div>
            <h1>Favorite Cards</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {favoriteCards.length > 0 ? (
                    favoriteCards.map((card) => (
                        <Card
                            key={card.index}
                            index={card.index}
                            name={card.name}
                            types={card.types}
                            imageUrl={card.imageUrl}
                            onToggleFavorite={handleToggleFavorite} // Pass the handler to Card
                        />
                    ))
                ) : (
                    <p>No favorite cards found.</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;
