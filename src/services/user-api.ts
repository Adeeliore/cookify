const API_BASE_URL = 'http://localhost:5005';

export const loginUser = async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return response;
};
