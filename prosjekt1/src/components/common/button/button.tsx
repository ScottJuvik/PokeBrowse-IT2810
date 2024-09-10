import styles from './button.module.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
}

const Button = ({ text, onClick, disabled = false, variant = 'primary', size = 'medium' }: ButtonProps) => {
    const getButtonClasses = () => {
        let baseClasses = styles.btn; 
        baseClasses += ` ${styles[variant]}`; 
        baseClasses += ` ${styles[size]}`; 
        return baseClasses;
    };

    return (
        <button className={getButtonClasses()} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;