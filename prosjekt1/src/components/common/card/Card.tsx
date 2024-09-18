import { useState } from 'react';
import styles from './Card.module.css';
import { Favorite, FavoriteFilled } from '@carbon/icons-react';

interface CardProps {
    index: number;
    name: string;
    imageUrl: string;
}

const Card = ({ index, name, imageUrl }: CardProps) => {
    const [isFavourite, setIsFavourite] = useState(false);

    const toggleFavourite = () => {
        setIsFavourite(!isFavourite);
    };

    return (
        <div className={styles.pokemonCard}>
            <button
                type="button"
                className={`${styles.pokemonHeart} ${isFavourite && styles.isFavourite}`}
                aria-label="Favourite Button"
                onClick={toggleFavourite}
            >
                {
                
            isFavourite 
                ? <FavoriteFilled 
                    size={24} 
                    data-testid="carbon-icon-favorite-filled" 
                  /> 
                : <Favorite 
                    size={24} 
                    data-testid="carbon-icon-favorite" 
                  />
                
            }
            </button>
            <img src={imageUrl} alt={name} className={styles.pokemonImage} />
            <div className={styles.pokemonDetails}>
                <p className={styles.pokemonIndex}>#{index}</p>
                <p className={styles.pokemonName}>{name}</p>
            </div>
        </div>
    );
};

export default Card;
