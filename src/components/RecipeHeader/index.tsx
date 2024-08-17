import React from "react";
import styles from './index.module.sass'
import InputComponent from "../ui/Input";

interface HeaderProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
    setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ query, setQuery, handleSearch, setIsFilterOpen }) => {
    return (
        <header className={styles.header}>
            <h1>Recipe Finder</h1>
            <div className={styles.search_box}>
                <InputComponent query={query} setQuery={setQuery} onSearch={handleSearch} />
                <button onClick={() => setIsFilterOpen(true)}>Filters</button>
            </div>
        </header>
    );
};

export default Header;
