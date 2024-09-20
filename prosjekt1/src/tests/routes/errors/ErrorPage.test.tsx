import ErrorPage from '@/routes/errors/ErrorPage';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, vi } from 'vitest';

const mockUseRouteError = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useRouteError: () => mockUseRouteError(),
    };
});

beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    vi.restoreAllMocks();
    mockUseRouteError.mockReset();
});

describe('ErrorPage', () => {
    const renderComponent = () => {
        render(
            <MemoryRouter>
                <ErrorPage />
            </MemoryRouter>
        );

        return {
            image: screen.getByRole('img'),
            container: screen.getByTestId('errorPage-wrapper'),
        };
    };

    it('renders the error page with default message when no error is provided', () => {
        mockUseRouteError.mockReturnValue(undefined);

        const { image } = renderComponent();
        expect(image).toBeInTheDocument();
    });

    it('matches the snapshot', () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
});
