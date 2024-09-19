import Card, { CardProps } from '@components/common/card/Card';
import { fireEvent, render, screen } from '@testing-library/react';

const cardProps: CardProps = {
    imageUrl: 'https://example.com/image.png',
    index: 1,
    name: 'Bulbasaur',
    types: ['grass', 'poison'],
};

const renderComponent = (props: CardProps) => {
    const utils = render(<Card {...props} />);
    const image = utils.getByAltText('Bulbasaur');
    const pokedexNumber = utils.getByText(/#1/i);
    const name = utils.getByText(/bulbasaur/i);
    const button = utils.getByRole('button');
    return { ...utils, image, pokedexNumber, name, button };
};

test('renders the card with default props', () => {
    const { image, pokedexNumber, name } = renderComponent(cardProps);

    expect(pokedexNumber).toHaveTextContent(/#1/i);
    expect(name).toHaveTextContent(/bulbasaur/i);
    expect(image).toHaveAttribute('src', cardProps.imageUrl);
});

it('should toggle favourite when the button is clicked', () => {
    const { button } = renderComponent(cardProps);

    expect(screen.getByTestId('carbon-icon-favorite')).toBeInTheDocument();
    expect(screen.queryByTestId('carbon-icon-favorite-filled')).not.toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByTestId('carbon-icon-favorite-filled')).toBeInTheDocument();
    expect(screen.queryByTestId('carbon-icon-favorite')).not.toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByTestId('carbon-icon-favorite')).toBeInTheDocument();
    expect(screen.queryByTestId('carbon-icon-favorite-filled')).not.toBeInTheDocument();
});

test('renders the card with types', () => {
    renderComponent(cardProps);

    cardProps.types.forEach(type => {
        const regex = new RegExp(type, 'i');
        expect(screen.getByText(regex)).toBeInTheDocument();
    });
});
