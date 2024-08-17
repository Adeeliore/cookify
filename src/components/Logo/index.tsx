import React from 'react';
import styles from './index.module.sass';
import logo from '../../resources/cookify_logo.svg';

const Logo: React.FC = () => {
    return <img src={logo} alt="Cookify LoginForm" className={styles.logo} />;
};

export default Logo;
