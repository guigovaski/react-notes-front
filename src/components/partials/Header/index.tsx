import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { RiStickyNoteFill } from 'react-icons/ri';

export const Header = () => {

    return (
        <header>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>Notes</Link>
                <RiStickyNoteFill size={25} color="#FFF" />
            </div>
        </header>
    );
}
