import Card from '@/components/common/card/Card';
import { PokemonListEntry } from '@/interfaces/pokemon';
import styles from './PokemonGrid.module.css';

interface PokemonGridProps {
    pokemons: PokemonListEntry[];
}

const PokemonGrid = ({ pokemons }: PokemonGridProps) => {
    return (
        <section className={styles.gridSection}>
            {pokemons.map(pokemon => (
                <Card key={pokemon.name} idOrName={pokemon.name} />
            ))}
        </section>
    );
};

export default PokemonGrid;
