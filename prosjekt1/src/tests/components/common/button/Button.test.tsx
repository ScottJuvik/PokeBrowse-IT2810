import Button, { ButtonSize, ButtonType } from '@/components/common/button/Button';
import styles from '@components/common/button/Button.module.css';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

describe('Button Component', () => {
    const renderComponent = ({
        text = "Catch 'Em All!",
        onClick = () => {},
        disabled = false,
        type = ButtonType.Outline,
        size = ButtonSize.Medium,
    } = {}) => {
        const { container } = render(
            <Button text={text} onClick={onClick} disabled={disabled} type={type} size={size} />
        );
        return {
            button: screen.getByText(new RegExp(text, 'i')),
            container,
        };
    };

    it('renders the button with correct text', () => {
        const { button } = renderComponent({ text: "Catch 'Em All!" });
        expect(button).toBeInTheDocument();
    });

    it('fires onClick event when button is clicked', () => {
        const handleClick = vi.fn();
        const { button } = renderComponent({ text: 'Click Me', onClick: handleClick });
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies filled type', () => {
        const { button } = renderComponent({ text: 'Filled Button', type: ButtonType.Filled });
        expect(button).toHaveClass(styles.btn);
        expect(button).toHaveClass(styles.filled);
    });

    it('is disabled when the disabled prop is passed', () => {
        const { button } = renderComponent({ text: 'Disabled Button', disabled: true });
        expect(button).toBeDisabled();
    });

    it('applies the correct size class', () => {
        const { button } = renderComponent({ text: 'Large Button', size: ButtonSize.Large });
        expect(button).toHaveClass(styles.large);
    });

    it('matches the snapshot', () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
});
