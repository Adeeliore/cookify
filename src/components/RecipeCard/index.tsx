import React, { useState } from 'react';
import styles from './index.module.sass';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Recipe } from '../../types/types.ts'

interface RecipeCardProps {
    recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleSaveClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

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
            return;
        }

        try {
            await axios.post('http://localhost:5005/save-recipe', { recipe, username });
            setIsFavorite(!isFavorite);
            alert('Recipe saved successfully');
        } catch (error) {
            alert('Failed to save recipe ' + error);
        }

    };

    return (
        <div className={styles.recipe_card} onClick={handleCardClick}>
            <div className={`${styles.card_inner} ${isFlipped ? styles.is_flipped : ''}`}>
                <div className={`${styles.card_face} ${styles.card_front}`}>
                    <img src={recipe.image || 'placeholder.jpg'} />
                    <div className={styles.recipe_card_text}>
                        <h3>{recipe.label}</h3>
                        {recipe.calories !== undefined && (
                            <p><strong>Calories:</strong> {recipe.calories.toFixed(2)}</p>
                        )}
                        {recipe.mealType && recipe.mealType.length > 0 && (
                            <p><strong>Meal Type:</strong> {recipe.mealType.join(', ')}</p>
                        )}
                        {recipe.cuisineType && recipe.cuisineType.length > 0 && (
                            <p><strong>Cuisine Type:</strong> {recipe.cuisineType.join(', ')}</p>
                        )}
                        {recipe.url && (
                            <a href={recipe.url} target="_blank" rel="noopener noreferrer">Источник</a>
                        )}
                        <button onClick={handleSaveClick} className={styles.save_button}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={isFavorite ? "#812c2c" : "#FFFFFF"}/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={`${styles.card_face} ${styles.card_back}`}>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.text}</li>
                        ))}
                    </ul>
                    <h3>Ingredients</h3>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;