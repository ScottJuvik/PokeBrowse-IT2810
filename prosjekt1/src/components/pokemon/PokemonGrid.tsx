import Card from '@/components/common/card/Card';
import { PokemonListEntry } from '@/interfaces/pokemon';
import { v4 as uuidv4 } from 'uuid';
import styles from './PokemonGrid.module.css';

interface PokemonGridProps {
    pokemons: PokemonListEntry[] | number[];
    onFavoriteToggle?: (idOrName: number, isFavorite: boolean) => void;
}

const PokemonGrid = ({ pokemons, onFavoriteToggle }: PokemonGridProps) => {
    return (
        <section className={styles.gridSection}>
            {pokemons.map(pokemon =>
                typeof pokemon === 'number' ? (
                    <Card
                        key={uuidv4()}
                        nameOrId={pokemon}
                        onFavoriteToggle={isFavorite => onFavoriteToggle?.(pokemon, isFavorite)}
                    />
                ) : (
                    <Card key={pokemon.name} nameOrId={pokemon.name} />
                )
            )}
        </section>
    );
};

export default PokemonGrid;
