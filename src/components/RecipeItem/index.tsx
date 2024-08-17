import React, { useState } from 'react';
import styles from './index.module.sass';

interface RecipeItemProps {
    recipe: any;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const ingredientsList = recipe.ingredients.map((ingredient: any, index: number) => (
        <li key={index}>
            {ingredient.text}: {ingredient.quantity} {ingredient.measure} {ingredient.food}
        </li>
    ));

    return (
        <div className={styles['recipe-item']}>
            <div className={styles['recipe-header']} onClick={toggleOpen}>
                <span>{recipe.label}</span>
                <span className={styles['toggle-arrow']}>{isOpen ? '▼' : '▶'}</span>
            </div>
            {isOpen && (
                <div className={styles['recipe-details']}>
                    <p><strong>Ingredients:</strong></p>
                    <ul>
                        {ingredientsList}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RecipeItem;

