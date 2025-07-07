/**
 * Tutorial system types and interfaces
 */

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  order: number;
  chapter: number;
  estimatedTime: number; // in minutes
  concepts: string[]; // Key concepts covered
  prerequisites?: string[]; // Required previous steps
}

export interface TutorialChapter {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedTime: number; // total time for chapter
  learningObjectives: string[];
  steps: TutorialStep[];
}

export interface CodeExercise {
  id: string;
  title: string;
  description: string;
  language: 'html' | 'css' | 'typescript' | 'javascript' | 'json';
  startingCode: string;
  targetCode: string;
  hints: string[];
  explanation: CodeExplanation;
}

export interface CodeExplanation {
  whatIsHappening: string; // Main explanation
  whyItMatters: string; // Business relevance
  realWorldConnection: string; // How this applies to BA work
  keyTerms: { [term: string]: string | undefined }; // Glossary of terms
}

export interface TutorialProgress {
  userId?: string; // Optional user tracking
  currentChapter: number;
  currentStep: string;
  completedSteps: string[];
  completedExercises: string[];
  timeSpent: number; // in minutes
  lastAccessed: Date;
}

export interface MinistryScenario {
  department: 'Ministry of Silly Walks';
  context: string;
  userStories: UserStory[];
  requirements: Requirement[];
  stakeholders: Stakeholder[];
}

export interface UserStory {
  id: string;
  asA: string; // "As a..."
  iWant: string; // "I want..."
  soThat: string; // "So that..."
  acceptanceCriteria: string[];
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface Requirement {
  id: string;
  type: 'Functional' | 'Non-Functional' | 'Business' | 'Technical';
  description: string;
  priority: 'Must Have' | 'Should Have' | 'Could Have' | 'Won\'t Have';
  relatedStories: string[]; // UserStory IDs
}

export interface Stakeholder {
  name: string;
  role: string;
  responsibilities: string[];
  technicalLevel: 'Non-technical' | 'Basic' | 'Intermediate' | 'Advanced';
}

export interface ValidationResult {
  isCorrect: boolean;
  feedback: string;
  suggestions?: string[];
  nextSteps?: string;
}

export interface ConceptExplanation {
  concept: string;
  simpleDefinition: string;
  technicalDefinition: string;
  analogies: string[];
  examples: string[];
  relatedConcepts: string[];
}

export interface TutorialSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  progress: TutorialProgress;
  notes: string[];
  questionsAsked: string[];
  conceptsLearned: string[];
}