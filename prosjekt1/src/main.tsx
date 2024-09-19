import ErrorPage from '@/routes/errors/ErrorPage';
import Home from '@/routes/home/Home';
import Layout from '@components/Layout/layout.tsx';
import NotFoundPage from '@routes/errors/NotFoundPage.tsx';
import Favorite from '@routes/favorites/Favorites';
import PokemonPage from '@routes/pokemon/PokemonPage';
import '@styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PokemonViewPage from './routes/pokemonView/PokemonViewPage';

const router = createBrowserRouter([
    {
        path: '/project1',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'pokemon/:nameOrId',
                element: <PokemonViewPage />,
            },
            {
                path: 'pokemon',
                element: <PokemonPage />,
            },
            {
                path: 'favorites',
                element: <Favorite />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {/* TODO: Remove before production */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>
);
