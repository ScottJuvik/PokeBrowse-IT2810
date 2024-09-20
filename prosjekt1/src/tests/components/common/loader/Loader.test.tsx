import gengar from '@assets/gengar.png';
import Loader from '@components/common/loader/Loader';
import { render, screen } from '@testing-library/react';

describe('Loader', () => {
    const renderComponent = (customImageSrc?: string, text?: string) => {
        render(<Loader customImageSrc={customImageSrc} text={text} />);

        return {
            image: screen.getByRole('img'),
            text: screen.getByLabelText('Loading text'),
            container: screen.getByTestId('loader'),
        };
    };

    it('renders the loader with the default props', () => {
        const { image, text } = renderComponent();
        expect(image).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });

    it('applies the custom image source', () => {
        const { image } = renderComponent(gengar);
        expect(image).toHaveAttribute('src', gengar);
    });

    it('applies the custom text', () => {
        const { text } = renderComponent(undefined, 'Custom text');
        expect(text).toHaveTextContent('Custom text');
    });

    it('sets aria-busy to true while loading', () => {
        const { image } = renderComponent();
        const loaderContainer = image.parentElement;
        expect(loaderContainer).toHaveAttribute('aria-busy', 'true');
    });

    it('matches the snapshot', () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
});
