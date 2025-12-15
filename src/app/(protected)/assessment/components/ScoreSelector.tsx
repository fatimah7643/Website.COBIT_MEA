'use client';

import React, { useState } from 'react';
import { SCORE_OPTIONS } from '../types';

interface ScoreSelectorProps {
  questionId: string;
  currentScore: number | null;
  onChange: (questionId: string, score: number) => void;
  disabled?: boolean;
}

const ScoreSelector: React.FC<ScoreSelectorProps> = ({ 
  questionId, 
  currentScore, 
  onChange, 
  disabled = false 
}) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(currentScore);

  const handleScoreChange = (score: number) => {
    if (!disabled) {
      setSelectedScore(score);
      onChange(questionId, score);
    }
  };

  return (
    <div className="grid grid-cols-6 gap-2 w-full max-w-4xl">
      {SCORE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleScoreChange(option.value)}
          disabled={disabled}
          className={`
            py-3 px-2 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center
            ${selectedScore === option.value
              ? 'bg-blue-500 text-white border-blue-500 shadow-md'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-blue-300'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <span className="font-bold">{option.value}</span>
          <span className="text-xs mt-1 text-center">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ScoreSelector;