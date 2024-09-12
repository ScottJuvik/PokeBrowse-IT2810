import classNames from 'classnames';
import styles from './button.module.css';

export enum ButtonType {
    Filled = 'filled',
    Outline = 'outline',
}

export enum ButtonSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    type?: ButtonType;
    size?: ButtonSize;
    customClassName?: string;
    style?: React.CSSProperties;
}

const Button = ({
    text,
    onClick,
    disabled = false,
    type = ButtonType.Filled,
    size = ButtonSize.Medium,
    customClassName = '',
    style = {},
}: ButtonProps) => {
    const getButtonClasses = () => {
        return classNames(styles.btn, styles[type], styles[size], { [styles.disabled]: disabled }, customClassName);
    };

    return (
        <button className={getButtonClasses()} onClick={onClick} disabled={disabled} style={style}>
            {text}
        </button>
    );
};

export default Button;
