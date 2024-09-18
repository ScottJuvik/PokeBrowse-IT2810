import { ArrowRight, Close } from '@carbon/icons-react';
import classNames from 'classnames';
import React from 'react';
import styles from './SearchBar.module.css';

export enum SearchBarSize {
    Small = 'small',
    Large = 'large',
}

export interface SearchBarProps {
    placeholder?: string;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSearch: (query: string) => void;
    size?: SearchBarSize;
    customClassName?: string;
}

const SearchBar = ({
    placeholder = 'Search for a Pokémon',
    searchQuery,
    setSearchQuery,
    onSearch,
    size = SearchBarSize.Large,
    customClassName = '',
}: SearchBarProps) => {
    const handleClearInput = () => {
        setSearchQuery('');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    const getSearchBarClasses = () => {
        return classNames(styles.searchWrapper, styles[size], customClassName);
    };

    return (
        <div className={styles.inputWrapper}>
            <form className={getSearchBarClasses()} onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={handleInputChange}
                />

                {size === SearchBarSize.Large && (
                    <button type="submit" className={styles.searchButton}>
                        <ArrowRight size={20} />
                    </button>
                )}

                {size === SearchBarSize.Small && searchQuery && (
                    <button type="button" className={styles.clearButton} onClick={handleClearInput}>
                        <Close size={20} />
                    </button>
                )}
            </form>
        </div>
    );
};

export default SearchBar;
