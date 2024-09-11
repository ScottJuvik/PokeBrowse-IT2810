import Home from '@routes/home/home.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

const queryClient = new QueryClient();

describe('Home component', () => {
    it("renders 'PokéBrowse' title on the home route", () => {
        const router = createMemoryRouter(
            [
                {
                    path: '/',
                    element: <Home />,
                },
            ],
            {
                initialEntries: ['/'],
            }
        );

        render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        );

        expect(within(screen.getByRole('heading', { level: 1 })).getByText(/Poké/i)).toBeInTheDocument();

        expect(within(screen.getByRole('heading', { level: 1 })).getByText(/Browse/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search for a Pokémon')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Random/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Pokémon/i })).toBeInTheDocument();
    });
});
