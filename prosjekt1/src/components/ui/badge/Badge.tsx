import styles from './Badge.module.css';
import { toTitleCase } from '@/utils/text';

// Export the BadgeProps interface so it can be imported elsewhere
export interface BadgeProps {
    type: string;
}

// Export the Badge component
export const Badge = ({ type }: BadgeProps) => {
    return <span className={`${styles.badge} ${styles[`badge-${type}`]}`}>{toTitleCase(type)}</span>;
};
