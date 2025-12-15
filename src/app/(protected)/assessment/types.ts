// Types for Assessment module based on COBIT Audit Pro specifications

export interface Assessment {
  id?: number;
  user_id: number;
  project_name: string;
  overall_score?: number;
  score_mea01?: number;
  score_mea02?: number;
  score_mea03?: number;
  assessment_date?: Date;
  updated_at?: Date;
}

export interface AssessmentDetail {
  id?: number;
  assessment_id: number;
  question_code: string;
  score: number;
}

export interface Question {
  id: string;
  code: string;
  domain: 'MEA01' | 'MEA02' | 'MEA03';
  text: string;
  description: string;
}

export interface DomainScore {
  domain: 'MEA01' | 'MEA02' | 'MEA03';
  score: number;
  maxScore: number;
  percentage: number;
}

export interface AssessmentResult {
  overallScore: number;
  mea01Score: number;
  mea02Score: number;
  mea03Score: number;
  domainScores: DomainScore[];
  recommendations: string[];
  maxPossibleScore: number;
}

// Scoring scale based on COBIT Audit Pro specifications
export const SCORE_OPTIONS = [
  { value: 0, label: 'Incomplete', description: 'Process is not performed' },
  { value: 1, label: 'Performed', description: 'Process is ad-hoc and possibly chaotic' },
  { value: 2, label: 'Managed', description: 'Process is planned and executed in response to stimulus' },
  { value: 3, label: 'Established', description: 'Process is documented, understood, and consistently applied' },
  { value: 4, label: 'Predictable', description: 'Process is well characterized and controlled' },
  { value: 5, label: 'Optimizing', description: 'Process is continuously improved' },
];

export const MEA_DOMAINS = [
  {
    code: 'MEA01',
    name: 'Performance and Conformance',
    description: 'Focuses on establishing monitoring approaches, setting targets, collecting data, and ensuring corrective actions.',
    questions: [
      {
        id: 'MEA01-Q1',
        code: 'MEA01.01',
        text: 'Establish a monitoring approach',
        description: 'Establishes and implements a systematic approach to monitor processes and services.'
      },
      {
        id: 'MEA01-Q2',
        code: 'MEA01.02',
        text: 'Set performance and conformance targets',
        description: 'Sets measurable targets for performance and conformance.'
      },
      {
        id: 'MEA01-Q3',
        code: 'MEA01.03',
        text: 'Collect and process performance and conformance data',
        description: 'Collects and processes data to measure performance and conformance.'
      },
      {
        id: 'MEA01-Q4',
        code: 'MEA01.04',
        text: 'Analyse and report performance',
        description: 'Analyses collected data and reports performance measurements.'
      },
      {
        id: 'MEA01-Q5',
        code: 'MEA01.05',
        text: 'Ensure the implementation of corrective actions',
        description: 'Ensures that appropriate corrective actions are implemented based on performance analysis.'
      }
    ]
  },
  {
    code: 'MEA02',
    name: 'System of Internal Control',
    description: 'Focuses on monitoring controls, assessing effectiveness, and identifying deficiencies.',
    questions: [
      {
        id: 'MEA02-Q1',
        code: 'MEA02.01',
        text: 'Monitor internal controls',
        description: 'Monitors the system of internal control for adequacy and effectiveness.'
      },
      {
        id: 'MEA02-Q2',
        code: 'MEA02.02',
        text: 'Review business process controls effectiveness',
        description: 'Reviews business process controls effectiveness.'
      },
      {
        id: 'MEA02-Q3',
        code: 'MEA02.03',
        text: 'Perform control self-assessments',
        description: 'Performs control self-assessments.'
      },
      {
        id: 'MEA02-Q4',
        code: 'MEA02.04',
        text: 'Identify and report control deficiencies',
        description: 'Identifies and reports control deficiencies.'
      },
      {
        id: 'MEA02-Q5',
        code: 'MEA02.05',
        text: 'Ensure that assurance providers are independent and qualified',
        description: 'Ensures that assurance providers are independent and qualified.'
      },
      {
        id: 'MEA02-Q6',
        code: 'MEA02.06',
        text: 'Plan assurance initiatives',
        description: 'Plans assurance initiatives.'
      },
      {
        id: 'MEA02-Q7',
        code: 'MEA02.07',
        text: 'Scope assurance initiatives',
        description: 'Scopes assurance initiatives.'
      },
      {
        id: 'MEA02-Q8',
        code: 'MEA02.08',
        text: 'Execute assurance initiatives',
        description: 'Executes assurance initiatives.'
      }
    ]
  },
  {
    code: 'MEA03',
    name: 'Compliance with External Requirements',
    description: 'Focuses on identifying compliance requirements and obtaining assurance of compliance.',
    questions: [
      {
        id: 'MEA03-Q1',
        code: 'MEA03.01',
        text: 'Identify external compliance requirements',
        description: 'Identifies external compliance requirements.'
      },
      {
        id: 'MEA03-Q2',
        code: 'MEA03.02',
        text: 'Optimise response to external requirements',
        description: 'Optimises response to external requirements.'
      },
      {
        id: 'MEA03-Q3',
        code: 'MEA03.03',
        text: 'Confirm external compliance',
        description: 'Confirms external compliance.'
      },
      {
        id: 'MEA03-Q4',
        code: 'MEA03.04',
        text: 'Obtain assurance of external compliance',
        description: 'Obtains assurance of external compliance.'
      }
    ]
  }
];