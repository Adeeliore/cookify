import React from 'react';
import RecipeList from '../RecipeList'
import styles from './index.module.sass'

interface RecipeContentProps {
    isLoading: boolean;
    error: string | null;
    recipes: any[];
}

const RecipeContent: React.FC<RecipeContentProps> = ({
                                                         isLoading,
                                                         error,
                                                         recipes,
                                                     }) => {
    return (
        <div className={styles.content}>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && recipes.length > 0 && (
                <RecipeList recipes={recipes} />
            )}
        </div>
    );
};

export default RecipeContent;

