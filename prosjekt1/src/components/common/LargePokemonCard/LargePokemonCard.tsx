import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './LargePokemonCard.module.css';
import { Favorite, FavoriteFilled, ArrowLeft, ChevronLeft, ChevronRight } from '@carbon/icons-react';
import PokemonStats from './PokemonStats/PokemonStats';
import Description from '@/components/common/LargePokemonCard/PokemonDescription/PokemonDescription';
import { Badge } from '@/components/ui/badge/Badge';
import { typeColorMap } from '@/components/ui/badge/Badge';
import { usePokemonSpecies } from '@/hooks/usePokemonSpecies';

interface LargePokemonCardProps {
    name: string;
    index: number;
    imageUrl: string;
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    abilities: string;
    types: string[];
    description: string;
    nextPokemon: () => void;
    prevPokemon: () => void;
}

const LargePokemonCard = ({
    name,
    index,
    imageUrl,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    types,
    nextPokemon,
    prevPokemon,
}: LargePokemonCardProps) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleFavourite = () => {
        setIsFavourite(!isFavourite);
    };

    const { data: speciesDescription } = usePokemonSpecies(index);

    // First type is the main type for background coloring
    const mainType = types[0];
    const backgroundColor = typeColorMap[mainType] || 'var(--bg-primary)';

    // Navigate to last page used
    const handleGoBack = () => {
        if (location.state?.from === '/favorites') {
            navigate('/favorites');
        } else if (location.state?.from === '/home') {
        } else {
            navigate('/pokemon');
        }
    };

    return (
        <div
            className={styles.largePokemonCard}
            style={{
                background: `radial-gradient(circle at 50% 10%, ${backgroundColor} 38%, #ffffff 80%)`,
            }}
        >
            <div className={styles.pokemonHeader}>
                <button onClick={handleGoBack} className={styles.returnButton}>
                    <ArrowLeft size={32} />
                </button>

                <h1 className={styles.pokemonName}>
                    {name}
                </h1>

                <button
                    type="button"
                    className={`${styles.pokemonHeart} ${isFavourite && styles.isFavourite}`}
                    aria-label="Favourite Button"
                    onClick={toggleFavourite}
                >
                    {isFavourite ? (
                        <FavoriteFilled size={36} data-testid="carbon-icon-favorite-filled" />
                    ) : (
                        <Favorite size={36} data-testid="carbon-icon-favorite" />
                    )}
                </button>
            </div>
            
            <div>
                <h2 className={styles.pokemonID}>
                    #{String(index).padStart(4, '0')}
                </h2>
            </div>

            <div className={styles.pokemonInfo}>
                <div className={styles.pokemonImageWrapper}>
                    <img src={imageUrl} alt={name} className={styles.pokemonImage} />
                </div>

                <PokemonStats
                    hp={hp}
                    attack={attack}
                    defense={defense}
                    specialAttack={specialAttack}
                    specialDefense={specialDefense}
                    speed={speed}
                />

                <Description text={speciesDescription || 'Loading description...'} />

                <div className={styles.navigationWrapper}>
                    <button onClick={prevPokemon} className={styles.prevButton}>
                        <ChevronLeft size={30}/> 
                        <span>Previous Pokémon</span>
                    </button>

                    <div className={styles.badgeWrapper}>
                        {types.map(type => (
                            <Badge key={type} type={type} />
                        ))}
                    </div>

                    <button onClick={nextPokemon} className={styles.nextButton}>
                        <span>Next Pokémon</span>
                        <ChevronRight size={30}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LargePokemonCard;
