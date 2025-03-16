import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import type { Question } from '../types';

// Simulated questions (replace with actual API call)
const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'What is the capital of France?',
    type: 'mcq',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris'
  },
  {
    id: '2',
    text: 'Explain the concept of photosynthesis in your own words.',
    type: 'text'
  }
];

export function ExerciseView() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const selectedTopics = useStore((state) => state.selectedTopics);
  const updatePerformance = useStore((state) => state.updatePerformance);
  const addCompletedExercise = useStore((state) => state.addCompletedExercise);

  const currentQuestion = mockQuestions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate performance
      const correctAnswers = mockQuestions.filter(
        (q) => q.correctAnswer === answers[q.id]
      ).length;
      const score = (correctAnswers / mockQuestions.length) * 100;
      
      // Update overall performance
      updatePerformance({
        totalExercises: mockQuestions.length,
        correctAnswers,
        topicsCompleted: selectedTopics.map(t => t.id),
        averageScore: score
      });

      // Add completed exercise
      selectedTopics.forEach(topic => {
        addCompletedExercise({
          id: Date.now().toString(),
          topicId: topic.id,
          date: new Date().toISOString(),
          score,
          questions: mockQuestions,
          answers
        });
      });
      
      navigate('/');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Question {currentQuestionIndex + 1} of {mockQuestions.length}
          </h2>
          <div className="text-sm text-gray-500">
            Topics: {selectedTopics.map(t => t.name).join(', ')}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg text-gray-700">{currentQuestion.text}</p>

          {currentQuestion.type === 'mcq' ? (
            <div className="space-y-2">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`${
                    answers[currentQuestion.id] === option
                      ? 'bg-indigo-100 border-indigo-500'
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  } w-full text-left px-4 py-3 border rounded-md transition-colors duration-150`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Type your answer here..."
            />
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {currentQuestionIndex < mockQuestions.length - 1 ? 'Next Question' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}