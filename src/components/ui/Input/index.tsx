import React from 'react'
import styles from './index.module.sass'
import MenuButton from "../../MenuButton";
import SearchIcon from "../../../resources/search.svg";

interface InputComponentProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
}

const InputComponent: React.FC<InputComponentProps> = ({ query, setQuery, onSearch }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div>
            <input
                className={styles.input_component}
                type="text"
                value={query}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="введите название или описание"
            />
            <MenuButton iconUrl={SearchIcon} onClick={onSearch} className={styles['search-button']} />
        </div>
    );
};

export default InputComponent;
