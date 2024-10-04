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

  // Handle creating a new duty
  const handleCreate = async () => {
    if (name.trim()) {
      try {
        const newDuty = await createDuty(name);
        setDuties([...duties, newDuty]);
        setName('');  // Clear input field after adding duty
      } catch (error) {
        setError('Failed to create duty.');
        console.error('Error creating duty:', error);
      }
    } else {
      alert('Duty name cannot be empty.');
    }
  };

  // Handle updating an existing duty
  const handleUpdate = async (id: number) => {
    const newName = prompt('Enter new name:');
    if (newName && newName.trim()) {
      try {
        await updateDuty(id, newName);
        setDuties(duties.map(duty => duty.id === id ? { ...duty, name: newName } : duty));
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
      <input 
        type="text" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Enter duty name" 
      />
      <button onClick={handleCreate}>Add Duty</button>

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
