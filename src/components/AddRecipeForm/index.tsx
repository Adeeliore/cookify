import React, { useState } from 'react';
import {addUserRecipe} from "../../services/recipe-api.ts";
import styles from './index.module.sass'

const AddRecipeForm: React.FC<{ fetchSavedRecipes: (username: string) => void }> = ({ fetchSavedRecipes }) => {
    const [label, setLabel] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [calories, setCalories] = useState('');
    const [mealType, setMealType] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const username = userData.username;

        const ingredientsArray = ingredients ? ingredients.split(',').map(ing => ({ text: ing.trim() })) : [];
        const mealTypeArray = mealType ? mealType.split(',').map(type => type.trim()) : [];
        const cuisineTypeArray = cuisineType ? cuisineType.split(',').map(type => type.trim()) : [];

        const recipeData: any = { label, ingredients: ingredientsArray, username };
        if (calories) recipeData.calories = Number(calories);
        if (mealTypeArray.length) recipeData.mealType = mealTypeArray;
        if (cuisineTypeArray.length) recipeData.cuisineType = cuisineTypeArray;
        if (url) recipeData.url = url;

        try {
            await addUserRecipe(recipeData);
            alert('Recipe added successfully');
            fetchSavedRecipes(username);
            setLabel('');
            setIngredients('');
            setCalories('');
            setMealType('');
            setCuisineType('');
            setUrl('');
        } catch (error) {
            alert(`Error adding recipe: ${error}`);
        }
    };

    return (
        <form className={styles.form_add}onSubmit={handleSubmit}>
            <h2>Add my recipe</h2>
            <input className={styles.input_add} type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" required />
            <input className={styles.input_add} type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients (comma separated)" />
            <input className={styles.input_add} type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="Calories" />
            <input className={styles.input_add} type="text" value={mealType} onChange={(e) => setMealType(e.target.value)} placeholder="Meal Type (comma separated)" />
            <input className={styles.input_add} type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} placeholder="Cuisine Type (comma separated)" />
            <input className={styles.input_add} type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" />
            <button className={styles.button_add} type="submit">Save Recipe</button>
        </form>
    );
};

export default AddRecipeForm;
