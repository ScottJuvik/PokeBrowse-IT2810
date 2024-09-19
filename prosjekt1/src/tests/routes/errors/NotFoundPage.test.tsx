import NotFoundPage from '@routes/errors/NotFoundPage';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

beforeEach(() => {
    mockNavigate.mockClear();
});

describe('NotFoundPage', () => {
    const renderComponent = () => {
        const { asFragment } = render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        );

        return {
            image: screen.getByRole('img'),
            heading: screen.getByRole('heading'),
            button: screen.getByRole('button'),
            asFragment,
        };
    };

    it('renders the error 404 page with all elements', () => {
        const { image, heading, button } = renderComponent();

        expect(image).toBeInTheDocument();

        expect(heading).toBeInTheDocument();

        const subtitle = screen.getByText(/transformed and escaped/i);
        expect(subtitle).toBeInTheDocument();

        const additionalText = screen.getByText(/hide and seek/i);
        expect(additionalText).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('navigates to home when the "Return to Safety" button is clicked', () => {
        const { button } = renderComponent();
        fireEvent.click(button);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('matches the snapshot', () => {
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });
});
