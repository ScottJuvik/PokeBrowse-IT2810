import styles from './Badge.module.css';
import { toTitleCase } from '@/utils/text';

export interface BadgeProps {
    type: string;
}

export const typeColorMap: Record<string, string> = {
    normal: 'var(--color-normal)',
    fire: 'var(--color-fire)',
    water: 'var(--color-water)',
    grass: 'var(--color-grass)',
    electric: 'var(--color-electric)',
    ice: 'var(--color-ice)',
    fighting: 'var(--color-fighting)',
    poison: 'var(--color-poison)',
    ground: 'var(--color-ground)',
    flying: 'var(--color-flying)',
    psychic: 'var(--color-psychic)',
    bug: 'var(--color-bug)',
    rock: 'var(--color-rock)',
    ghost: 'var(--color-ghost)',
    dragon: 'var(--color-dragon)',
    dark: 'var(--color-dark)',
    steel: 'var(--color-steel)',
    fairy: 'var(--color-fairy)',
};

export const Badge = ({ type }: BadgeProps) => {
    const badgeType = typeColorMap[type] ? type : 'unknown';
    const backgroundColor = typeColorMap[badgeType] || 'var(--color-unknown)';

    return (
        <span className={`${styles.badge} ${styles[`badge-${badgeType}`]}`} style={{ backgroundColor: backgroundColor }}>
            {toTitleCase(badgeType)}
        </span>
    );
};
