import axios from 'axios';

// Use environment variable for API URL or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/duties';

// Fetch all duties
export const getDuties = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch duties');
  }
};

// Create a new duty
export const createDuty = async (name: string) => {
  try {
    const response = await axios.post(API_URL, { name });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create duty');
  }
};

// Update an existing duty
export const updateDuty = async (id: number, name: string) => {
  try {
    await axios.put(`${API_URL}/${id}`, { name });
  } catch (error) {
    throw new Error('Failed to update duty');
  }
};

// Delete a duty
export const deleteDuty = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed to delete duty');
  }
};
