import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.sass';
import {fetchSavedRecipes} from "../../services/recipe-api.ts";
import AddRecipeForm from "../../components/AddRecipeForm";
import RecipeList from "../../components/RecipeList";
import MenuButton from "../../components/MenuButton";
import HomeIcon from '../../resources/home.svg';


const MyBookPage: React.FC = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = () => {
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            if (userData.expiration && Date.now() > userData.expiration) {
                localStorage.removeItem('userData');
                return '';
            }
            return userData.username || '';
        };

        const username = getUserData();
        if (username === '') {
            navigate('/login');
        } else {
            getSavedRecipes(username);
        }
    }, [navigate]);

    const getSavedRecipes = async (username: string) => {
        try {
            const data = await fetchSavedRecipes(username);
            setRecipes(data);
        } catch (error) {
            console.error('Error fetching saved recipes:', error);
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className={styles['my-book-container']}>
            <MenuButton iconUrl={HomeIcon} onClick={handleBackToHome} className={styles['back-to-home-button']} />
            <AddRecipeForm fetchSavedRecipes={getSavedRecipes} />
            <RecipeList recipes={recipes} />
        </div>
    );
};

export default MyBookPage;