import { Badge } from '@/components/ui/badge/Badge';
import { usePokemon } from '@/hooks/usePokemon';
import { MinimalPokemon } from '@/interfaces/pokemon';
import { formatPokemonName } from '@/utils/text';
import whosThatPokemon from '@assets/who.jpg';
import { memo, useState } from 'react';
import FavoriteButton from './FavoriteButton';
import SkeletonLoader from './SkeletonLoader';
import styles from './styles/Card.module.css';

export interface CardProps {
    idOrName: string | number;
}

const Card = ({ idOrName }: CardProps) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const {
        data: pokemon,
        isLoading,
        error,
    } = usePokemon(idOrName) as {
        data: MinimalPokemon | undefined;
        isLoading: boolean;
        error: Error | null;
    };

    const toggleFavourite = () => {
        setIsFavourite(!isFavourite);
    };

    if (isLoading) {
        return <SkeletonLoader />;
    }

    if (error) {
        console.error('Error loading Pokémon data:', error);
        return <p>Error loading Pokémon data</p>;
    }

    return (
        <div className={styles.pokemonCard}>
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
