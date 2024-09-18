import pokeball from '@assets/pokeball.svg';
import classNames from 'classnames';
import styles from './Loader.module.css';

interface LoaderProps {
    size?: string;
    text?: string;
    customImageSrc?: string;
    className?: string;
}

const Loader = ({ size = '5rem', text = 'Catching Pokémon...', customImageSrc, className }: LoaderProps) => {
    const loaderWrapperClass = classNames(styles.loaderWrapper, className);

    return (
        <div data-testid="loader" aria-busy="true" aria-live="polite" role="status" className={loaderWrapperClass}>
            <img
                src={customImageSrc || pokeball}
                alt="Loading icon"
                style={{ width: size, height: size }}
                className={styles.pokeball}
            />
            <p className={styles.loadingText} aria-label="Loading text">
                {text}
            </p>
        </div>
    );
};

export default Loader;
