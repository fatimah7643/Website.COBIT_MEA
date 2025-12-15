'use client';

import React from 'react';
import { AssessmentResult } from '../types';

interface RecommendationProps {
  result: AssessmentResult | null;
}

const Recommendation: React.FC<RecommendationProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <p className="text-gray-700">Complete the assessment to see recommendations.</p>
      </div>
    );
  }

  // Generate recommendations based on domain scores
  const generateRecommendations = () => {
    const recs: string[] = [];
    
    if (result.mea01Score < 2) {
      recs.push("MEA01 (Performance and Conformance) requires significant improvement: Establish systematic monitoring and reporting processes.");
    } else if (result.mea01Score < 3) {
      recs.push("MEA01 (Performance and Conformance) needs improvement: Document procedures for consistent monitoring and reporting.");
    }
    
    if (result.mea02Score < 2) {
      recs.push("MEA02 (System of Internal Control) requires significant improvement: Implement basic internal controls and monitoring approaches.");
    } else if (result.mea02Score < 3) {
      recs.push("MEA02 (System of Internal Control) needs improvement: Strengthen control self-assessment and defect identification processes.");
    }
    
    if (result.mea03Score < 2) {
      recs.push("MEA03 (Compliance with External Requirements) requires significant improvement: Develop processes to identify and monitor external compliance requirements.");
    } else if (result.mea03Score < 3) {
      recs.push("MEA03 (Compliance with External Requirements) needs improvement: Formalize compliance confirmation and assurance processes.");
    }

    // Overall recommendations based on total score
    if (result.overallScore < 2) {
      recs.push("Overall governance maturity is low: Focus on establishing foundational processes and controls across all domains.");
    } else if (result.overallScore < 3) {
      recs.push("Overall governance maturity is developing: Standardize processes and increase monitoring activities.");
    } else if (result.overallScore < 4) {
      recs.push("Overall governance maturity is established: Optimize processes and enhance predictive capabilities.");
    } else {
      recs.push("Overall governance maturity is strong: Focus on continuous improvement and innovation.");
    }

    return recs.length > 0 ? recs : ["Your organization shows good COBIT governance practices. Maintain focus on continuous improvement."];
  };

  const recommendations = generateRecommendations();

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommendations</h3>
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg ${
              result.overallScore < 2 
                ? 'bg-red-50 border border-red-200' 
                : result.overallScore < 3 
                  ? 'bg-yellow-50 border border-yellow-200' 
                  : 'bg-green-50 border border-green-200'
            }`}
          >
            <p className="text-gray-700">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;