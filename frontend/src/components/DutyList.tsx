import React, { useEffect, useState } from 'react';
import { getDuties, createDuty, updateDuty, deleteDuty } from '../services/dutyService';

interface Duty {
  id: number;
  name: string;
}

const DutyList: React.FC = () => {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null); // State for name validation error

  // Fetch duties when the component mounts
  useEffect(() => {
    const fetchDuties = async () => {
      try {
        const data = await getDuties();
        setDuties(data);
      } catch (error) {
        setError('Failed to fetch duties.');
        console.error('Error fetching duties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDuties();
  }, []);

  // Validate duty name
  const validateName = (name: string): string | null => {
    if (!name.trim()) {
      return 'Duty name cannot be empty.';
    }
    if (name.length < 3) {
      return 'Duty name must be at least 3 characters long.';
    }
    const invalidChars = /[^a-zA-Z0-9\s]/;
    if (invalidChars.test(name)) {
      return 'Duty name can only contain letters, numbers, and spaces.';
    }
    return null; // No validation error
  };

  // Handle creating a new duty
  const handleCreate = async () => {
    const validationError = validateName(name);
    if (validationError) {
      setNameError(validationError); // Set validation error
      return;
    }

    try {
      const newDuty = await createDuty(name);
      setDuties([...duties, newDuty]);
      setName(''); // Clear input field after adding duty
      setNameError(null); // Clear any validation errors after successful creation
    } catch (error) {
      setError('Failed to create duty.');
      console.error('Error creating duty:', error);
    }
  };

  // Handle updating an existing duty
  const handleUpdate = async (id: number) => {
    const newName = prompt('Enter new name:');
    if (newName && newName.trim()) {
      const validationError = validateName(newName);
      if (validationError) {
        alert(validationError); // Prompt validation errors for update
        return;
      }

      try {
        await updateDuty(id, newName);
        setDuties(duties.map(duty => (duty.id === id ? { ...duty, name: newName } : duty)));
      } catch (error) {
        setError('Failed to update duty.');
        console.error('Error updating duty:', error);
      }
    }
  };

  // Handle deleting an existing duty
  const handleDelete = async (id: number) => {
    try {
      await deleteDuty(id);
      setDuties(duties.filter(duty => duty.id !== id));
    } catch (error) {
      setError('Failed to delete duty.');
      console.error('Error deleting duty:', error);
    }
  };

  if (loading) return <div>Loading duties...</div>;

  return (
    <div>
      <h1>Duty List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Input for creating new duty */}
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter duty name"
      />
      <button onClick={handleCreate}>Add Duty</button>
      
      {/* Display validation errors */}
      {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
      
      {/* List of duties */}
      <ul>
        {duties.map(duty => (
          <li key={duty.id}>
            {duty.name} 
            <button onClick={() => handleUpdate(duty.id)}>Update</button>
            <button onClick={() => handleDelete(duty.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DutyList;
