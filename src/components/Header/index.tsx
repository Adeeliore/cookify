import React from "react";
import styles from './index.module.sass'
import InputComponent from "../ui/Input";
import MenuButton from "../MenuButton";
import HomeIcon from "../../resources/home.svg";

interface HeaderProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
    setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleToggleMenuContent: () => void;
}

const Header: React.FC<HeaderProps> = ({ query, setQuery, handleSearch,  handleToggleMenuContent }) => {
    return (
        <header className={styles.header}>
            <div className={styles.search_box}>
                <MenuButton iconUrl={HomeIcon} onClick={handleToggleMenuContent} className={styles['menu-button']} />
                <InputComponent query={query} setQuery={setQuery} onSearch={handleSearch} />
            </div>
        </header>
    );
};

export default Header;
