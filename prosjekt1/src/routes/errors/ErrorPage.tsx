import gengar from '@assets/gengar.png';
import { useRouteError } from 'react-router-dom';
import styles from './styles/ErrorPage.module.css';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <main className={styles.errorContainer} data-testid="errorPage-wrapper">
            <img src={gengar} alt="Error Image" aria-label="Error image" />
            <h1>Uh-oh, Gengar's Mischief!</h1>

            <p className={styles.sorryText}>Sorry, an unexpected error has occured.</p>

            <p className={styles.prankText}>
                Gengar's ghostly pranks seem to have caused a disturbance in the web continuum.
            </p>

            <p className={styles.errorText}>{error instanceof Error ? error.message : 'Something went wrong!'}</p>

            <p className={styles.statusText}>
                <i>{(error as { statusText?: string })?.statusText || 'Mysterious forces at work...'}</i>
            </p>
        </main>
    );
};

export default ErrorPage;
