export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'text';
  options?: string[];
  correctAnswer?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Performance {
  totalExercises: number;
  correctAnswers: number;
  topicsCompleted: string[];
  averageScore: number;
}

export interface CompletedExercise {
  id: string;
  topicId: string;
  date: string;
  score: number;
  questions: Question[];
  answers: Record<string, string>;
}

export interface TopicRecommendation {
  topicId: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}