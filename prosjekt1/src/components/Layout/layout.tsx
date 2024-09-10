import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import styles from './styles/layout.module.css';

const Layout = () => (
    <div className={styles.layout}>
        <Navbar />
        <div className={styles.content}>
            <Outlet />
        </div>
    </div>
);

export default Layout;
