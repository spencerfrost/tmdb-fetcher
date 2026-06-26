import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

interface DetailContainerProps {
  children: React.ReactNode;
}

export const DetailContainer: React.FC<DetailContainerProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)} 
          className="mb-6"
        >
          Back
        </Button>
        {children}
      </div>
    </div>
  );
};