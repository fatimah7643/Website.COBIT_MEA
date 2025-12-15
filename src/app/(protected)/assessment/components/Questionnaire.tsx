'use client';

import React, { useState } from 'react';
import { MEA_DOMAINS, Question } from '../types';
import ScoreSelector from './ScoreSelector';

interface QuestionnaireProps {
  onSubmit: (scores: Record<string, number>) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onSubmit }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  const handleScoreChange = (questionId: string, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };
  
  const isFormComplete = () => {
    // Check if all questions have been answered
    const totalQuestions = MEA_DOMAINS.flatMap(domain => domain.questions).length;
    return Object.keys(answers).length === totalQuestions;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">COBIT Assessment Questionnaire</h2>
        <p className="text-gray-600">
          Answer the following questions to assess your organization's maturity level across the three MEA domains.
          Select a score from 0 (Incomplete) to 5 (Optimizing) based on how well your organization performs each practice.
        </p>
      </div>

      {MEA_DOMAINS.map((domain) => (
        <div key={domain.code} className="border rounded-lg p-6 bg-white shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{domain.code}: {domain.name}</h3>
            <p className="text-gray-600">{domain.description}</p>
          </div>
          
          <div className="space-y-6">
            {domain.questions.map((question) => (
              <div key={question.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <div className="mb-3">
                  <label className="block text-lg font-medium text-gray-800 mb-1">
                    {question.code}. {question.text}
                  </label>
                  <p className="text-gray-600 text-sm">{question.description}</p>
                </div>
                
                <div className="mt-4">
                  <ScoreSelector 
                    questionId={question.id} 
                    currentScore={answers[question.id] || null} 
                    onChange={handleScoreChange} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={!isFormComplete()}
          className={`px-6 py-3 rounded-lg font-medium ${
            isFormComplete()
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Assessment
        </button>
      </div>
    </form>
  );
};

export default Questionnaire;