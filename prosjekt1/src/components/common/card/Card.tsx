import { Badge } from '@/components/ui/badge/Badge';
import { usePokemon } from '@/hooks/usePokemon';
import { MinimalPokemon } from '@/interfaces/pokemon';
import { formatPokemonName } from '@/utils/text';
import whosThatPokemon from '@assets/who.jpg';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import SkeletonLoader from './SkeletonLoader';
import styles from './styles/Card.module.css';

interface CardProps {
    nameOrId: string | number;
    onToggleFavorite?: () => void;
}

const Card = ({ nameOrId, onToggleFavorite }: CardProps) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const {
        data: pokemon,
        isLoading,
        error,
    } = usePokemon(nameOrId) as {
        data: MinimalPokemon | undefined;
        isLoading: boolean;
        error: Error | null;
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (pokemon) {
            const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            if (storedFavorites.includes(pokemon.id)) {
                setIsFavourite(true);
            }
        }
    }, [pokemon]);

    if (isLoading) {
        return <SkeletonLoader />;
    }

    if (error || !pokemon) {
        console.error('Error loading Pokémon data:', error);
        return <p>Error loading Pokémon data</p>;
    }

    const handleCardClick = () => {
        navigate(`/project1/pokemon/${pokemon.name}`);
    };

    const toggleFavourite = () => {
        setIsFavourite(!isFavourite);

        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        let updatedFavorites;
        if (storedFavorites.includes(pokemon.id)) {
            updatedFavorites = storedFavorites.filter((favIndex: number) => favIndex !== pokemon.id);
        } else {
            updatedFavorites = [...storedFavorites, pokemon.id];
        }

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        if (onToggleFavorite) {
            onToggleFavorite();
        }
    };

    if (isLoading) {
        return <SkeletonLoader />;
    }

    if (error) {
        console.error('Error loading Pokémon data:', error);
        return <p>Error loading Pokémon data</p>;
    }

    return (
        <div className={styles.pokemonCard} onClick={handleCardClick}>
            <FavoriteButton isFavorite={isFavourite} onClick={toggleFavourite} />
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
