// components/ui/description/Description.tsx
import styles from './PokemonDescription.module.css';

interface DescriptionProps {
    text: string;
}

const Description = ({ text }: DescriptionProps) => {
    return (
        <div className={styles.pokemonDescription}>
            <p>{text}</p>
        </div>
    );
};

export default Description;
