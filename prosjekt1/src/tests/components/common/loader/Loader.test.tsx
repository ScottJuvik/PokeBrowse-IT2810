import gengar from '@assets/gengar.png';
import Loader from '@components/common/loader/Loader';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

describe('Loader', () => {
    it('renders the loader with the default props', () => {
        render(<Loader />);

        const image = screen.getByAltText('Loading icon');
        expect(image).toBeInTheDocument();

        const text = screen.getByText('Catching Pokémon...');
        expect(text).toBeInTheDocument();
    });

    it('applies the custom image source', () => {
        render(<Loader customImageSrc={gengar} />);

        const image = screen.getByAltText('Loading icon');
        expect(image).toHaveAttribute('src', gengar);
    });

    it('applies the custom text', () => {
        render(<Loader text="Custom text" />);

        const text = screen.getByText('Custom text');
        expect(text).toBeInTheDocument();
    });

    it;
});
