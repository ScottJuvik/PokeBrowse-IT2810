import Home from '@routes/home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('@/hooks/useRandomPokemonId', () => ({
    useRandomPokemonId: () => ({
        refetch: vi.fn().mockResolvedValue({ data: 25 }),
        isLoading: false,
    }),
}));

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

describe('Home', () => {
    const renderComponent = () => {
        const queryClient = new QueryClient();

        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </QueryClientProvider>
        );

        return {
            randomButton: screen.getByRole('button', { name: /random/i }),
            pokemonButton: screen.getByRole('button', { name: /pokémon/i }),
            container,
        };
    };

    it('should trigger navigation to a random pokemon when random button is clicked', async () => {
        const { randomButton } = renderComponent();

        fireEvent.click(randomButton);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('pokemon/25');
        });
    });

    it('should trigger navigation to /pokemon when pokemon button is clicked', () => {
        const { pokemonButton } = renderComponent();

        fireEvent.click(pokemonButton);

        expect(mockNavigate).toHaveBeenCalledWith('pokemon');
    });

    it('matches the snapshot', () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
});
