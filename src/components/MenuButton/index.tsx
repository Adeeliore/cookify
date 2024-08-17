import React from 'react';
import styles from './index.module.sass';

interface ButtonProps {
    iconUrl: string;
    label?: string;
    onClick?: () => void;
    className?: string;
}

const MenuButton: React.FC<ButtonProps> = ({ iconUrl, label, onClick, className }) => {
    return (
        <button onClick={onClick} className={`${styles.button} ${className}`}>
            <img src={iconUrl} alt="icon" className={styles.icon} />
            {label && <span>{label}</span>}
        </button>
    );
};

export default MenuButton;
