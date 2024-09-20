import LargePokemonCard from '@/components/common/LargePokemonCard/LargePokemonCard';
import Loader from '@/components/common/loader/Loader';
import { usePokemon } from '@/hooks/usePokemon';
import ErrorPage from '@/routes/errors/ErrorPage';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PokemonViewPage.module.css';

const PokemonViewPage = () => {
    const { idOrName } = useParams<{ idOrName: string }>();
    const navigate = useNavigate();

    if (!idOrName) {
        return <div>Error: Pokémon ID or Name is undefined</div>;
    }

    const { data: pokemon, isLoading, isError } = usePokemon(idOrName);

    if (isLoading) {
        return (
            <div className={styles.pokemonViewContainer}>
                <Loader />
            </div>
        );
    }

    if (isError || !pokemon) {
        return <ErrorPage />;
    }

    const { name, sprites, stats, abilities, types } = pokemon;

    const hp = stats.find((stat: any) => stat.stat.name === 'hp').base_stat;
    const attack = stats.find((stat: any) => stat.stat.name === 'attack').base_stat;
    const defense = stats.find((stat: any) => stat.stat.name === 'defense').base_stat;
    const specialAttack = stats.find((stat: any) => stat.stat.name === 'special-attack').base_stat;
    const specialDefense = stats.find((stat: any) => stat.stat.name === 'special-defense').base_stat;
    const speed = stats.find((stat: any) => stat.stat.name === 'speed').base_stat;

    const parsedAbilities = abilities.map((ability: any) => ability.ability.name).join(', ');
    const parsedTypes = types.map((type: any) => type.type.name);

    const nextPokemon = () => {
        const nextId = Number(pokemon.id) + 1;
        navigate(`/pokemon/${nextId}`);
    };

    const prevPokemon = () => {
        const prevId = Number(pokemon.id) - 1;
        if (prevId > 0) {
            navigate(`/pokemon/${prevId}`);
        }
    };

    return (
        <div className={styles.pokemonViewContainer}>
            <LargePokemonCard
                name={name.charAt(0).toUpperCase() + name.slice(1)}
                index={pokemon.id}
                imageUrl={sprites.other['official-artwork'].front_default}
                hp={hp}
                attack={attack}
                defense={defense}
                specialAttack={specialAttack}
                specialDefense={specialDefense}
                speed={speed}
                abilities={parsedAbilities}
                types={parsedTypes}
                description="The more sunlight Ivysaur bathes in, the more strength wells up within it, allowing the bud on its back to grow larger."
                nextPokemon={nextPokemon}
                prevPokemon={prevPokemon}
            />
        </div>
    );
};

export default PokemonViewPage;
