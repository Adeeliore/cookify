import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './index.module.sass';

interface FilterComponentProps {
    isOpen: boolean;
    onApplyFilters: (filters: any) => void;
    onClose: () => void;
}

const diets = [
    { value: '', label: 'Any' },
    { value: 'high-protein', label: 'High Protein' },
    { value: 'low-carb', label: 'Low Carb' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'high-fiber', label: 'High-fiber' },
    { value: 'low-fat', label: 'Low-fat' },
    { value: 'low-Sodium', label: 'Low-Sodium' },
];

const cuisineTypes = [
    { value: '', label: 'Any' },
    { value: 'american', label: 'American' },
    { value: 'asian', label: 'Asian' },
    { value: 'british', label: 'British' },
    { value: 'caribbean', label: 'Caribbean' },
    { value: 'central europe', label: 'Central Europe' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'eastern europe', label: 'Eastern Europe' },
    { value: 'french', label: 'French' },
    { value: 'greek', label: 'Greek' },
    { value: 'indian', label: 'Indian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'korean', label: 'Korean' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'nordic', label: 'Nordic' },
    { value: 'south american', label: 'South American' },
    { value: 'south east asian', label: 'South East Asian' },
    { value: 'world', label: 'World' },
];

const mealTypes = [
    { value: '', label: 'Any' },
    { value: 'brunch', label: 'Brunch' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' },
    { value: 'teatime', label: 'Teatime' },
];

const healthOptions = [
    { value: '', label: 'Any' },
    { value: 'kidney-friendly', label: 'Kidney Friendly' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'low-fat-abs', label: 'Low Fat Abs' },
    { value: 'low-potassium', label: 'Low Potassium' },
    { value: 'low-sugar', label: 'Low Sugar' },
    { value: 'lupine-free', label: 'Lupine Free' },
    { value: 'Mediterranean', label: 'Mediterranean' },
    { value: 'mollusk-free', label: 'Mollusk Free' },
    { value: 'mustard-free', label: 'Mustard Free' },
    { value: 'no-oil-added', label: 'No Oil Added' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'peanut-free', label: 'Peanut Free' },
    { value: 'pescatarian', label: 'Pescatarian' },
    { value: 'pork-free', label: 'Pork Free' },
    { value: 'red-meat-free', label: 'Red Meat Free' },
    { value: 'sesame-free', label: 'Sesame Free' },
    { value: 'shellfish-free', label: 'Shellfish Free' },
    { value: 'soy-free', label: 'Soy Free' },
    { value: 'sugar-conscious', label: 'Sugar Conscious' },
    { value: 'sulfite-free', label: 'Sulfite Free' },
    { value: 'tree-nut-free', label: 'Tree Nut Free' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'wheat-free', label: 'Wheat Free' },
];

const RecipeFilter: React.FC<FilterComponentProps> = ({ isOpen, onApplyFilters, onClose }) => {
    const [diet, setDiet] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [mealType, setMealType] = useState('');
    const [health, setHealth] = useState('');
    const [caloriesMin, setCaloriesMin] = useState<number | undefined>();
    const [caloriesMax, setCaloriesMax] = useState<number | undefined>();
    const [glycemicIndexMin, setGlycemicIndexMin] = useState<number | undefined>();
    const [glycemicIndexMax, setGlycemicIndexMax] = useState<number | undefined>();

    const handleApply = () => {
        onApplyFilters({
            diet,
            cuisineType,
            mealType,
            health,
            caloriesMin,
            caloriesMax,
            glycemicIndexMin,
            glycemicIndexMax,
        });
        onClose();
    };

    return (
        <Modal className={styles.filter_container} isOpen={isOpen} onRequestClose={onClose} contentLabel="Filter Modal">
            <div>
                <h2>Filters</h2>
                <div>
                    <label>Diet</label>
                    <select className={styles.filter} value={diet} onChange={(e) => setDiet(e.target.value)}>
                        {diets.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Cuisine Type</label>
                    <select className={styles.filter} value={cuisineType} onChange={(e) => setCuisineType(e.target.value)}>
                        {cuisineTypes.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Meal Type</label>
                    <select className={styles.filter} value={mealType} onChange={(e) => setMealType(e.target.value)}>
                        {mealTypes.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Health</label>
                    <select className={styles.filter} value={health} onChange={(e) => setHealth(e.target.value)}>
                        {healthOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Calories Min</label>
                    <input
                        className={styles.filter_input}
                        type="number"
                        value={caloriesMin !== undefined ? caloriesMin : ''}
                        onChange={(e) => setCaloriesMin(e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                </div>
                <div>
                    <label>Calories Max</label>
                    <input
                        className={styles.filter_input}
                        type="number"
                        value={caloriesMax !== undefined ? caloriesMax : ''}
                        onChange={(e) => setCaloriesMax(e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                </div>
                <div>
                    <label>Glycemic Index Min</label>
                    <input
                        className={styles.filter_input}
                        type="number"
                        value={glycemicIndexMin !== undefined ? glycemicIndexMin : ''}
                        onChange={(e) => setGlycemicIndexMin(e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                </div>
                <div>
                    <label>Glycemic Index Max</label>
                    <input
                        className={styles.filter_input}
                        type="number"
                        value={glycemicIndexMax !== undefined ? glycemicIndexMax : ''}
                        onChange={(e) => setGlycemicIndexMax(e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                </div>
                <button className={styles.filter_button} onClick={handleApply}>Apply Filters</button>
                <button className={styles.filter_button} onClick={onClose}>Close</button>
            </div>
        </Modal>
    );
};

export default RecipeFilter;