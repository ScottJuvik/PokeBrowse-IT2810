import Loader from '@/components/common/loader/Loader';
import Pagination from '@/components/common/pagination/Pagination';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import { usePokemonCount } from '@/hooks/usePokemonCount'; // Import the new hook
import { usePokemonList } from '@/hooks/usePokemonList';
import { PokemonListResponse } from '@/interfaces/pokemon';
import ErrorPage from '@routes/errors/ErrorPage';
import { useState } from 'react';
import styles from './PokemonPage.module.css';

const PokemonPage = () => {
    const [page, setPage] = useState<number>(0);
    const limit = 25;

    const {
        data: pokemonListResponse,
        isLoading: isListLoading,
        error: listError,
    } = usePokemonList(page, limit) as {
        data: PokemonListResponse;
        isLoading: boolean;
        error: Error | null;
    };

    const { data: pokemonCount, isLoading: isCountLoading, error: countError } = usePokemonCount();

    if (isListLoading || isCountLoading) {
        return (
            <div className={styles.loaderContainer}>
                <Loader />
            </div>
        );
    }

    if (listError || countError) {
        return <ErrorPage />;
    }

    const totalPages = pokemonCount ? Math.ceil(pokemonCount / limit) : 0;

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(prevPage => prevPage - 1);
        }
    };

    const handleFirstPage = () => {
        setPage(0);
    };

    const handleLastPage = () => {
        setPage(totalPages - 1);
    };

    return (
        <div className={styles.pokemonPageContainer}>
            <main>
                <PokemonGrid pokemons={pokemonListResponse.results} />
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handlePreviousPage={handlePreviousPage}
                    handleNextPage={handleNextPage}
                    handleFirstPage={handleFirstPage}
                    handleLastPage={handleLastPage}
                />
            </main>
        </div>
    );
};

export default PokemonPage;
