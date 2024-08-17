const API_ID = 'f87ad8bf';
const API_KEY = '6cfff10e9ffaca393b0c968cfd0c7168';

interface Filters {
    diet?: string;
    cuisineType?: string;
    mealType?: string;
    caloriesMin?: number;
    caloriesMax?: number;
    glycemicIndexMin?: number;
    glycemicIndexMax?: number;
    health?: string;
}

export const fetchRecipes = async (query: string, filters: Filters) => {
    let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}`;

    if (query.trim()) {
        url += `&q=${encodeURIComponent(query.trim())}`;
    }

    if (filters.diet) {
        url += `&diet=${encodeURIComponent(filters.diet)}`;
    }

    if (filters.cuisineType) {
        url += `&cuisineType=${encodeURIComponent(filters.cuisineType)}`;
    }

    if (filters.mealType) {
        url += `&mealType=${encodeURIComponent(filters.mealType)}`;
    }

    if (filters.caloriesMin !== undefined || filters.caloriesMax !== undefined) {
        if (filters.caloriesMin !== undefined && filters.caloriesMax !== undefined) {
            url += `&calories=${filters.caloriesMin}-${filters.caloriesMax}`;
        } else if (filters.caloriesMin !== undefined) {
            url += `&calories=${filters.caloriesMin}+`;
        } else if (filters.caloriesMax !== undefined) {
            url += `&calories=${filters.caloriesMax}`;
        }
    }

    if (filters.glycemicIndexMin !== undefined || filters.glycemicIndexMax !== undefined) {
        if (filters.glycemicIndexMin !== undefined && filters.glycemicIndexMax !== undefined) {
            url += `&glycemicIndex=${filters.glycemicIndexMin}-${filters.glycemicIndexMax}`;
        } else if (filters.glycemicIndexMin !== undefined) {
            url += `&glycemicIndex=${filters.glycemicIndexMin}+`;
        } else if (filters.glycemicIndexMax !== undefined) {
            url += `&glycemicIndex=${filters.glycemicIndexMax}`;
        }
    }

    if (filters.health) {
        url += `&health=${encodeURIComponent(filters.health)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    return data.hits ? data.hits.map((hit: any) => hit.recipe) : [];
};

