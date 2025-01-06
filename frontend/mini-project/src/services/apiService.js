// src/services/apiService.js

const API_URL = 'http://localhost:3000/api/auth'; // Backend API URL

// Sign up API call
export const signUp = async (formData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Sign up failed!');
    }

    return await response.json(); // Return the response data
  } catch (error) {
    throw error;
  }
};

// Login API call
export const login = async (formData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Login failed!');
    }

    return await response.json(); // Return the response data
  } catch (error) {
    throw error;
  }
};
