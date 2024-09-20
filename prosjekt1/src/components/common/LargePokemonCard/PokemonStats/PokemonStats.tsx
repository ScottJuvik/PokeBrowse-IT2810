// components/ui/stats/PokemonStats.tsx
import styles from './PokemonStats.module.css';

interface PokemonStatsProps {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

const PokemonStats = ({ hp, attack, defense, specialAttack, specialDefense, speed }: PokemonStatsProps) => {
    return (
        <div className={styles.pokemonStats}>
            <div className={styles.statItem}>
                <span className={styles.statLabel}>HP</span>
                <span className={styles.statValue}>{hp}</span>
            </div>
            <div className={styles.statItem}>
                <span className={styles.statLabel}>Attack</span>
                <span className={styles.statValue}>{attack}</span>
            </div>
            <div className={styles.statItem}>
                <span className={styles.statLabel}>Defense</span>
                <span className={styles.statValue}>{defense}</span>
            </div>
            <div className={styles.statItem}>
                <span className={styles.statLabel}>Sp.Attack</span>
                <span className={styles.statValue}>{specialAttack}</span>
            </div>
            <div className={styles.statItem}>
                <span className={styles.statLabel}>Sp.Defense</span>
                <span className={styles.statValue}>{specialDefense}</span>
            </div>
            <div className={styles.statItem}>
                <span className={styles.statLabel}>Speed</span>
                <span className={styles.statValue}>{speed}</span>
            </div>
        </div>
    );
};

export default PokemonStats;
