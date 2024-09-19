import { NavLink } from 'react-router-dom';
import styles from './styles/navbar.module.css';

const Navbar = () => (
    <nav className={styles.navbar}>
        <ul>
            <li>
                <NavLink to="/project1/" end className={({ isActive }) => (isActive ? styles.active : '')}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/project1/pokemon" className={({ isActive }) => (isActive ? styles.active : '')}>
                    Pokémon
                </NavLink>
            </li>
            <li>
                <NavLink to="/project1/favorites" className={({ isActive }) => (isActive ? styles.active : '')}>
                    Favorites
                </NavLink>
            </li>
        </ul>
    </nav>
);

export default Navbar;
