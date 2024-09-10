import Home from '@routes/home/home.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

const queryClient = new QueryClient();

describe('Home component', () => {
    it("renders 'Hello World' on the home route", () => {
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

        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
});
