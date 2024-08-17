const API_BASE_URL = 'http://localhost:5005';

export const fetchSavedRecipes = async (username: string) => {
    const response = await fetch(`${API_BASE_URL}/my-book?username=${username}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
};

export const addUserRecipe = async (recipeData: any) => {
    const response = await fetch(`${API_BASE_URL}/add-user-recipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
};