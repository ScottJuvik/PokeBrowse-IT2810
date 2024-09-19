import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '@/components/common/card/Card';

describe('Card Component - Props Validation', () => {
    const cardProps = {
        index: 1,
        name: 'Bulbasaur',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    };

    const renderComponent = () => {
        render(<Card {...cardProps} />);

        return {
            image: screen.getByRole('img'),
            pokedexNumber: screen.getByText(/#/i),
            name: screen.getByText(/Bulbasaur/i),
            button: screen.getByRole('button'),
        };
    };

    test('renders the card with default props', () => {
        const { image, pokedexNumber, name } = renderComponent();

        expect(pokedexNumber).toHaveTextContent(/#1/i);
        expect(name).toHaveTextContent(/bulbasaur/i);

        expect(image).toHaveAttribute('src', cardProps.imageUrl);
    });

    it('should toggle favourite when the button is clicked', () => {
        const { button } = renderComponent();

        expect(screen.getByTestId('carbon-icon-favorite')).toBeInTheDocument();
        expect(screen.queryByTestId('carbon-icon-favorite-filled')).not.toBeInTheDocument();

        fireEvent.click(button);

        expect(screen.getByTestId('carbon-icon-favorite-filled')).toBeInTheDocument();
        expect(screen.queryByTestId('carbon-icon-favorite')).not.toBeInTheDocument();

        fireEvent.click(button);

        expect(screen.getByTestId('carbon-icon-favorite')).toBeInTheDocument();
        expect(screen.queryByTestId('carbon-icon-favorite-filled')).not.toBeInTheDocument();
    });
});
