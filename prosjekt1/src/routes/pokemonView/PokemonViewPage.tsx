import LargePokemonCard from '@/components/common/LargePokemonCard/LargePokemonCard';
import Loader from '@/components/common/loader/Loader';
import { usePokemon } from '@/hooks/usePokemon';
import { MinimalPokemon, Stat } from '@/interfaces/pokemon';
import ErrorPage from '@/routes/errors/ErrorPage';
import { formatPokemonName } from '@/utils/text';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PokemonViewPage.module.css';

const PokemonViewPage = () => {
    const { nameOrId } = useParams<{ nameOrId: string }>();
    const navigate = useNavigate();

    if (!nameOrId) {
        return <div>Error: Pokémon ID or Name is undefined</div>;
    }

    const {
        data: pokemon,
        isLoading,
        error,
    } = usePokemon(nameOrId) as {
        data: MinimalPokemon | undefined;
        isLoading: boolean;
        error: Error | null;
    };

    if (isLoading) {
        return (
            <div className={styles.pokemonViewContainer}>
                <Loader />
            </div>
        );
    }

    if (error || !pokemon) {
        return <ErrorPage />;
    }

    const { name, sprite, stats, types } = pokemon;

    const hp = stats.find((stat: Stat) => stat.name === 'hp')?.value || 0;
    const attack = stats.find((stat: Stat) => stat.name === 'attack')?.value || 0;
    const defense = stats.find((stat: Stat) => stat.name === 'defense')?.value || 0;
    const specialAttack = stats.find((stat: Stat) => stat.name === 'special-attack')?.value || 0;
    const specialDefense = stats.find((stat: Stat) => stat.name === 'special-defense')?.value || 0;
    const speed = stats.find((stat: Stat) => stat.name === 'speed')?.value || 0;

    const nextPokemon = () => {
        const nextId = Number(pokemon.id) + 1;
        navigate(`/project1/pokemon/${nextId}`);
    };

    const prevPokemon = () => {
        const prevId = Number(pokemon.id) - 1;
        if (prevId > 0) {
            navigate(`/project1/pokemon/${prevId}`);
        }
    };

    return (
        <div className={styles.pokemonViewContainer}>
            <LargePokemonCard
                name={formatPokemonName(name)}
                index={pokemon.id}
                imageUrl={sprite}
                hp={hp}
                attack={attack}
                defense={defense}
                specialAttack={specialAttack}
                specialDefense={specialDefense}
                speed={speed}
                types={types}
                description="The more sunlight Ivysaur bathes in, the more strength wells up within it, allowing the bud on its back to grow larger."
                nextPokemon={nextPokemon}
                prevPokemon={prevPokemon}
            />
        </div>
    );
};

export default PokemonViewPage;
