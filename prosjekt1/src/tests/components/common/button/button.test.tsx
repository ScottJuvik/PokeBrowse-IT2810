import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@components/common/button/button.tsx';
import styles from '@components/common/button/button.module.css';
import { vi } from 'vitest';

describe('Button Component', () => {
    test('renders the button with correct text', () => {
        render(<Button text="Catch 'Em All!" onClick={() => {}} />);
        const buttonElement = screen.getByText(/Catch 'Em All!/i);
        expect(buttonElement).toBeInTheDocument();
    });

    test('fires onClick event when button is clicked', () => {
        const handleClick = vi.fn();
        render(<Button text="Click Me" onClick={handleClick} />);
        const buttonElement = screen.getByText(/Click Me/i);
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('applies primary variant class', () => {
        render(<Button text="Primary Button" onClick={() => {}} variant="primary" />);
        const buttonElement = screen.getByText(/Primary Button/i);
        expect(buttonElement).toHaveClass(styles.btn);
        expect(buttonElement).toHaveClass(styles.primary);
    });

    test('is disabled when the disabled prop is passed', () => {
        render(<Button text="Disabled Button" onClick={() => {}} disabled={true} />);
        const buttonElement = screen.getByText(/Disabled Button/i);
        expect(buttonElement).toBeDisabled();
    });

    test('applies the correct size class', () => {
        render(<Button text="Large Button" onClick={() => {}} size="large" />);
        const buttonElement = screen.getByText(/Large Button/i);
        expect(buttonElement).toHaveClass(styles.large);
    });
});
