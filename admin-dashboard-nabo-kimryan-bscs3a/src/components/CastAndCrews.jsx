import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const CastAndCrews = () => {
  const [castAndCrews, setCastAndCrews] = useState([]);
  const [newCrewMember, setNewCrewMember] = useState({ name: '', role: '' });
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCastAndCrews = async () => {
    const accessToken = localStorage.getItem('accessToken'); // Get token
    try {
      setIsLoading(true);
      const response = await axios.get(`/movies/${movieId}/cast-and-crews`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCastAndCrews(response.data); // Assuming response.data is the array of cast and crews
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch cast and crews:', error);
      setIsLoading(false);
    }
  };


  const addCrewMember = () => {
    if (!newCrewMember.name || !newCrewMember.role) {
      alert('Both name and role are required!');
      return;
    }
    setCastAndCrews([
      ...castAndCrews,
      { id: Date.now(), name: newCrewMember.name, role: newCrewMember.role },
    ]);
    setNewCrewMember({ name: '', role: '' });
  };

  const updateCrewMember = (id, updatedMember) => {
    setCastAndCrews(
      castAndCrews.map((crew) => (crew.id === id ? { ...crew, ...updatedMember } : crew))
    );
  };

  const deleteCrewMember = (id) => {
    setCastAndCrews(castAndCrews.filter((crew) => crew.id !== id));
  };

  return (
    <div>
      <h2>Cast & Crews</h2>
      <ul>
        {castAndCrews.map((crew) => (
          <li key={crew.id}>
            <strong>{crew.name}</strong> - {crew.role}
            <button onClick={() => updateCrewMember(crew.id, { role: 'Updated Role' })}>
              Edit Role
            </button>
            <button onClick={() => deleteCrewMember(crew.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add Crew Member</h3>
      <input
        type="text"
        placeholder="Name"
        value={newCrewMember.name}
        onChange={(e) => setNewCrewMember({ ...newCrewMember, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Role"
        value={newCrewMember.role}
        onChange={(e) => setNewCrewMember({ ...newCrewMember, role: e.target.value })}
      />
      <button onClick={addCrewMember}>Add</button>
    </div>
  );
};

export default CastAndCrews;
