import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import api from '../api/api';
import type { Question } from '../types';

export function ExerciseView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [tentative, setTentative] = useState<any>(null);
  
  const selectedTopics = useStore((state) => state.selectedTopics);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await api.get(`/questions/exercice/${id}`);
        const tentative = await api.post(`/tentatives/`, { exercice_id: id });

        setTentative(tentative);
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [id]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Soumettre les réponses
      try {
        for (const questionId in answers) {
          await api.post(`/tentatives/${tentative.id}/reponses`, {
            contenu: answers[questionId],
            tentative_id: tentative.id,
            question_id: parseInt(questionId, 10)
          });
        }

        // Terminer la tentative
        const response = await api.post(`/tentatives/${tentative.id}/terminer`, {});
        navigate(`/exercise/${id}/report`);
      } catch (error) {
        console.error('Error submitting answers:', error);
      }
    }
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <div className="text-sm text-gray-500">
            Topics: {selectedTopics.map(t => t.name).join(', ')}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg text-gray-700">{currentQuestion.enonce}</p>

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
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}