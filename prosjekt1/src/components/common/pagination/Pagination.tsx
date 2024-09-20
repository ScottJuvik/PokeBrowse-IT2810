import DoubleChevronLeft from '@/components/icons/DoubleChevronLeft';
import DoubleChevronRight from '@/components/icons/DoubleChevronRight';
import { ChevronLeft, ChevronRight } from '@carbon/icons-react';
import styles from './Pagination.module.css';

interface PaginationProps {
    page: number;
    totalPages: number;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    handleFirstPage: () => void;
    handleLastPage: () => void;
}

const Pagination = ({
    page,
    totalPages,
    handlePreviousPage,
    handleNextPage,
    handleFirstPage,
    handleLastPage,
}: PaginationProps) => {
    const size = 24;

    return (
        <section className={styles.pagination}>
            <button onClick={handleFirstPage} disabled={page === 0} className={styles.paginationButton}>
                <DoubleChevronLeft size={size} />
            </button>
            <button onClick={handlePreviousPage} disabled={page === 0} className={styles.paginationButton}>
                <ChevronLeft size={size} />
            </button>
            <p>
                Page {page + 1} of {totalPages}
            </p>
            <button onClick={handleNextPage} disabled={page >= totalPages - 1} className={styles.paginationButton}>
                <ChevronRight size={size} />
            </button>
            <button
                onClick={handleLastPage}
                disabled={page >= totalPages - 1}
                className={`${styles.paginationButton} ${styles.paginationButtonEnd}`}
            >
                <DoubleChevronRight size={size} />
            </button>
        </section>
    );
};

export default Pagination;
