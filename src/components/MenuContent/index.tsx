import React from 'react';
import MenuButton from '../MenuButton';
import BookIcon from '../../resources/book.svg';
import ChickenIcon from '../../resources/chicken.svg';
import BeefIcon from '../../resources/beef.svg';
import FishIcon from '../../resources/fish.svg';
import GlutenIcon from '../../resources/gluten.svg';
import SettingsIcon from '../../resources/settings.svg';
import SugarIcon from '../../resources/sugar.svg';
import VeganIcon from '../../resources/vegan.svg';
import styles from './index.module.sass';
import { Filters } from "../../types/types";

interface MenuContentProps {
    setQuery: (query: string) => void;
    setIsFilterOpen: (isOpen: boolean) => void;
    handleApplyFilters: (newFilters: Filters) => void;
}

const MenuContent: React.FC<MenuContentProps> = ({ setQuery, setIsFilterOpen }) => {
    const handleButtonClick = (query: string) => {
        setQuery(query);
    };

    const handleSettingsClick = () => {
        setIsFilterOpen(true);
    };

    return (
        <div className={styles.menu}>
            <div className={styles.button_icons}>
                <div className={styles.set}>
                    <MenuButton iconUrl={BookIcon}  className={styles.button_large} onClick={() => window.location.href = '/my-book'} />
                    <MenuButton iconUrl={SettingsIcon} className={styles.button_large} onClick={handleSettingsClick} />
                </div>
                <div className={styles.food}>
                    <MenuButton iconUrl={ChickenIcon} className={styles.button_medium} onClick={() => handleButtonClick('chicken')} />
                    <MenuButton iconUrl={BeefIcon} className={styles.button_small} onClick={() => handleButtonClick('beef')} />
                    <MenuButton iconUrl={FishIcon} className={styles.button_medium} onClick={() => handleButtonClick('fish')} />
                    <MenuButton iconUrl={SugarIcon} className={styles.button_large} onClick={() => handleButtonClick('sugar-conscious')} />
                    <MenuButton iconUrl={VeganIcon} className={styles.button_small} onClick={() => handleButtonClick('vegan')} />
                    <MenuButton iconUrl={GlutenIcon} className={styles.button_medium} onClick={() => handleButtonClick('gluten-free')} />
                </div>
            </div>
        </div>
    );
};

export default MenuContent;

