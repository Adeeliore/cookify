
export interface Filters {
    diet?: string;
    cuisineType?: string;
    mealType?: string;
    health?: string;
    caloriesMin?: number;
    caloriesMax?: number;
    glycemicIndexMin?: number;
    glycemicIndexMax?: number;
}


export interface Ingredient {
    text: string;
    quantity: number;
    measure: string;
    food: string;
    weight: number;
    foodCategory: string;
    foodId: string;
    image: string;
}

export interface Recipe {
    label: string;
    image?: string;
    calories?: number;
    mealType?: string[];
    cuisineType?: string[];
    url?: string;
    ingredients?: Ingredient[];
}

export interface RecipeListProps {
    recipes: Recipe[];
}