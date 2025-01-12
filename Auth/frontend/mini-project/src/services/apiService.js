// src/services/apiService.js

const API_URL = 'http://localhost:3000/api/auth'; // Backend API URL

// Sign up API call
export const signUp = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // Check for a specific error message returned from backend
      const errorData = await response.json();
      throw new Error(errorData.message || 'Sign up failed!');
    }

    return await response.json(); // Return the response data
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error; // Re-throw the error so it can be handled elsewhere
  }
};

// Login API call
export const login = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // Check for a specific error message returned from backend
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed!');
    }

    return await response.json(); // Return the response data
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Re-throw the error so it can be handled elsewhere
  }
};
