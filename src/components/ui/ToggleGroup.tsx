import React from 'react';
import { Button } from './button';

interface ToggleGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({ options, value, onChange }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {options.map((option) => (
        <Button
          key={option}
          onClick={() => onChange(option)}
          variant={value === option ? 'default' : 'outline'}
          className={`${
            value === option
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          } ${
            option === options[0] ? 'rounded-r-none' : ''
          } ${
            option === options[options.length - 1] ? 'rounded-l-none' : ''
          } border-gray-600`}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export { ToggleGroup };
