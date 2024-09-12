import NotFoundPage from '@/routes/errors/notFoundPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

const queryClient = new QueryClient();

describe("notFoundPage", () => {
    it("renders an error 404 page", () => {
        const router = createMemoryRouter(
            [
                {
                    path: '/',
                    element: <NotFoundPage />,
                },
            ],
            {
                initialEntries: ['/'],
            }
        );
        
        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        );
        
        // assert that image is shown on page
        const image = screen.getByRole('img', { name: "Ditto" });
        expect(image).toBeInTheDocument(); 

        // assert that title text is shown on page
        expect(screen.getByText("Oh no! It's a Ditto!")).toBeInTheDocument();

        // assert that error text is shown on page (two paragraphs)
        // we do this by using a queryselector of the render
        const paragraphs = container.querySelectorAll("p");
        expect(paragraphs).toHaveLength(2);
    });
});