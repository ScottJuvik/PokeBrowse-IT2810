import { Badge } from '@/components/ui/badge/Badge';
import useFavorites from '@/hooks/useFavorites';
import { usePokemon } from '@/hooks/usePokemon';
import { MinimalPokemon } from '@/interfaces/pokemon';
import { formatPokemonName } from '@/utils/text';
import whosThatPokemon from '@assets/who.jpg';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import SkeletonLoader from './SkeletonLoader';
import styles from './styles/Card.module.css';

interface CardProps {
    nameOrId: string | number;
    onFavoriteToggle?: (isFavorite: boolean) => void;
}

const Card = ({ nameOrId, onFavoriteToggle }: CardProps) => {
    const {
        data: pokemon,
        isLoading,
        error,
    } = usePokemon(nameOrId) as {
        data: MinimalPokemon | undefined;
        isLoading: boolean;
        error: Error | null;
    };

    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = pokemon ? favorites.includes(pokemon.id) : false;

    const handleToggleFavorite = () => {
        toggleFavorite(pokemon!.id);
        if (onFavoriteToggle) {
            onFavoriteToggle(!isFavorite);
        }
    };

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/project1/pokemon/${pokemon?.id}`);
    };

    if (isLoading) {
        return <SkeletonLoader />;
    }

    if (error || !pokemon) {
        console.error('Error loading Pokémon data:', error);
        return <p>Error loading Pokémon data</p>;
    }

    return (
        <div className={styles.pokemonCard} onClick={handleCardClick}>
            <FavoriteButton isFavorite={isFavorite} onClick={handleToggleFavorite} />
            {pokemon && (
                <>
                    <img
                        src={pokemon.sprite ?? whosThatPokemon}
                        alt={pokemon.name ?? 'Unknown Pokémon'}
                        className={styles.pokemonImage}
                    />
                    <div className={styles.pokemonDetails}>
                        <p className={styles.pokemonIndex}>#{pokemon.id}</p>
                        <p className={styles.pokemonName}>{formatPokemonName(pokemon.name)}</p>
                        <div className={styles.badgeWrapper}>
                            {pokemon.types.map(type => (
                                <Badge key={type} type={type} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default memo(Card);
