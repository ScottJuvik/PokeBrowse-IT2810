import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import styles from './styles/layout.module.css';
import Dropdown from './dropdown';
import { useEffect, useState } from 'react';

const Layout = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    if (isMobile) {
        return (
            <div className={styles.layoutMobile}>
                <Dropdown />
                <div className={styles.contentMobile}>
                    <Outlet />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.layout}>
            <Navbar />
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};
export default Layout;
