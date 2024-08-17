import React from 'react';
import RecipeCard from '../RecipeCard';
import styles from './index.module.sass';
import { RecipeListProps } from '../../types/types.ts'


const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
    return (
        <div className={styles.recipe_list}>
            {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
            ))}
        </div>
    );
};

export default RecipeList;

