import styles from './Badge.module.css';
import { toTitleCase } from '@/utils/text';

export interface BadgeProps {
    type: string;
}

export const Badge = ({ type }: BadgeProps) => {
    // Define valid badge types
    const validTypes = [
        'normal',
        'fire',
        'water',
        'grass',
        'electric',
        'ice',
        'fighting',
        'poison',
        'ground',
        'flying',
        'psychic',
        'bug',
        'rock',
        'ghost',
        'dragon',
        'dark',
        'steel',
        'fairy',
    ];

    const badgeType = validTypes.includes(type) ? type : 'unknown';

    return <span className={`${styles.badge} ${styles[`badge-${badgeType}`]}`}>{toTitleCase(badgeType)}</span>;
};
