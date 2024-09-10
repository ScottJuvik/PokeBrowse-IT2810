import ditto from '@assets/ditto.png';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <div className={styles.errorContainer}>
            <img src={ditto} alt="Ditto" />
            <h1 className="text-4xl">Oh no! It's a Ditto!</h1>
            <p className={`${styles.subtitle} text-xl`}>
                The page you are looking for seems to have transformed and escaped.
            </p>
            <p className={`${styles.text} text-lg`}>
                Maybe it's playing hide and seek, or perhaps you took a wrong turn at Lavender Town.
            </p>

            <button onClick={handleRedirect} className="transition-color text-base">
                Return to Safety
            </button>
        </div>
    );
};

export default NotFoundPage;
