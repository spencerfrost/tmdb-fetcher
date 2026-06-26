import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { fetchPersonDetails } from '../utils/api';
import { PersonDetail } from '../utils/types';
import { Alert, AlertDescription } from './ui/alert';
import { DetailContainer } from './DetailContainer';

// Remove the Props interface entirely if you are using useParams
const PersonDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract id from URL
  const [person, setPerson] = useState<PersonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Guard clause

    const loadPerson = async () => {
      setLoading(true);
      try {
        const data = await fetchPersonDetails(Number(id)); // Convert id to number
        setPerson(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load person');
      } finally {
        setLoading(false);
      }
    };
    loadPerson();
  }, [id]);

  if (loading) return <div className="text-center py-12 text-gray-400">Loading person...</div>;
  if (error) return <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>;
  if (!person) return null;

  return (
    <DetailContainer>
        <div className="bg-gray-800 rounded-lg p-6 text-white">
        <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
            {person.profile_path ? (
                <img 
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} 
                alt={person.name} 
                className="w-full rounded-lg shadow-lg"
                />
            ) : (
                <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center">No Image</div>
            )}
            </div>
            <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{person.name}</h1>
            <p className="text-gray-400 mb-4">{person.place_of_birth}</p>
            <p className="text-gray-300 leading-relaxed">{person.biography}</p>
            </div>
        </div>
        </div>
    </DetailContainer>
  );
};

export default PersonDetailView;