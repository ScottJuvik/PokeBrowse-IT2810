import { NavLink, useLocation } from 'react-router-dom';
import { useState } from "react";
import { Menu, CloseLarge } from '@carbon/icons-react';
import styles from './styles/dropdown.module.css';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const getMenuColor = () => {
        switch (location.pathname) {
            case '/pokemon' || '/favorites':
                return '#2e3440';
            default:
                return '#e1e4ea';
        }
    };

    return(
        <nav className={styles.navbar}>
            <div className={styles.icon}>
                {isOpen ? (
                    <CloseLarge size="40" onClick={toggleDropdown} color='white'/>
                    ) : (
                    <Menu size="40" onClick={toggleDropdown} color={getMenuColor()} />
                )}
            </div>

            <ul className={`${styles.dropdown} ${isOpen ? styles.open : ''}`} onClick={toggleDropdown}>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
                        Home
                    </NavLink>
                </li>
                <li>
                <NavLink to="/pokemon" className={({ isActive }) => (isActive ? styles.active : '')}>
                    Pokémon
                </NavLink>
                </li>
                <li>
                    <NavLink to="/favorites" className={({ isActive }) => (isActive ? styles.active : '')}>
                        Favorites
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Dropdown;