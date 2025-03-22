import { create } from 'zustand';
import { Topic, Question, User, Performance, CompletedExercise, TopicRecommendation } from '../types';

interface State {
  user: User | null;
  token: string | null; // Ajoutez cette ligne
  selectedTopics: Topic[];
  currentQuestions: Question[];
  performance: Performance;
  completedExercises: CompletedExercise[];
  recommendations: TopicRecommendation[];
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void; // Ajoutez cette ligne
  setSelectedTopics: (topics: Topic[]) => void;
  setCurrentQuestions: (questions: Question[]) => void;
  updatePerformance: (performance: Performance) => void;
  addCompletedExercise: (exercise: CompletedExercise) => void;
  updateRecommendations: () => void;
}

export const useStore = create<State>((set, get) => ({
  user: null,
  token: null, // Ajoutez cette ligne
  selectedTopics: [],
  currentQuestions: [],
  performance: {
    totalExercises: 0,
    correctAnswers: 0,
    topicsCompleted: [],
    averageScore: 0,
  },
  completedExercises: [],
  recommendations: [],
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }), // Ajoutez cette ligne
  setSelectedTopics: (topics) => set({ selectedTopics: topics }),
  setCurrentQuestions: (questions) => set({ currentQuestions: questions }),
  updatePerformance: (performance) => set({ performance }),
  addCompletedExercise: (exercise) => {
    set((state) => ({
      completedExercises: [...state.completedExercises, exercise]
    }));
    get().updateRecommendations();
  },
  updateRecommendations: () => {
    const state = get();
    const topicScores = new Map<string, { total: number; count: number }>();
    
    // Calculate average scores per topic
    state.completedExercises.forEach((exercise) => {
      const current = topicScores.get(exercise.topicId) || { total: 0, count: 0 };
      topicScores.set(exercise.topicId, {
        total: current.total + exercise.score,
        count: current.count + 1
      });
    });

    // Generate recommendations based on performance
    const recommendations: TopicRecommendation[] = Array.from(topicScores.entries())
      .map(([topicId, stats]) => {
        const averageScore = stats.total / stats.count;
        if (averageScore < 60) {
          return {
            topicId,
            reason: 'Needs improvement - Score below 60%',
            priority: 'high'
          };
        } else if (averageScore < 80) {
          return {
            topicId,
            reason: 'Could be better - Score below 80%',
            priority: 'medium'
          };
        }
        return null;
      })
      .filter((rec): rec is TopicRecommendation => rec !== null);

    set({ recommendations });
  }
}));