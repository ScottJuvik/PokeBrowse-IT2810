import { Favorite, FavoriteFilled } from '@carbon/icons-react';
import styles from './styles/FavoriteButton.module.css';

interface FavoriteButtonProps {
    isFavorite: boolean;
    onClick: () => void;
}

const FavoriteButton = ({ isFavorite, onClick }: FavoriteButtonProps) => (
    <button
        type="button"
        className={`${styles.pokemonHeart} ${isFavorite && styles.isFavorite}`}
        aria-label="Favourite Button"
        onClick={onClick}
    >
        {isFavorite ? (
            <FavoriteFilled size={24} data-testid="carbon-icon-favorite-filled" />
        ) : (
            <Favorite size={24} data-testid="carbon-icon-favorite" />
        )}
    </button>
);

export default FavoriteButton;
