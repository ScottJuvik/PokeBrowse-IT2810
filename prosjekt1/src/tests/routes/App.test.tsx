import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect } from 'vitest';
import App from '../../routes/App.tsx';

const queryClient = new QueryClient();

describe('App component', () => {
    it("renders 'Hello World' on the home route", () => {
        const router = createMemoryRouter(
            [
                {
                    path: '/',
                    element: <App />,
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

        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
});
