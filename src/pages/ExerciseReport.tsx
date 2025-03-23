import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { CheckCircle2, XCircle, AlertCircle, Trophy, ArrowRight } from 'lucide-react';
import type { Question } from '../types';

export function ExerciseReport() {
    const navigate = useNavigate();
    const currentQuestions = useStore((state) => state.currentQuestions);
    const selectedTopics = useStore((state) => state.selectedTopics);
    const lastExercise = useStore((state) => 
        state.completedExercises[state.completedExercises.length - 1]
    );

    if (!lastExercise) {
        navigate('/');
        return null;
    }

    const getQuestionFeedback = (question: Question, answer: string) => {
        if (question.type === 'mcq') {
        const isCorrect = question.correctAnswer === answer;
        return {
            icon: isCorrect ? CheckCircle2 : XCircle,
            iconColor: isCorrect ? 'text-green-500' : 'text-red-500',
            feedback: isCorrect 
            ? 'Correct answer!' 
            : `Incorrect. The correct answer is: ${question.correctAnswer}`
        };
        } else {
        return {
            icon: AlertCircle,
            iconColor: 'text-blue-500',
            feedback: 'Your answer has been recorded. Here is some feedback on your response:'
        };
        }
    };

    // AI-generated feedback for text answers (simulated)
    const getTextAnswerFeedback = (answer: string) => {
        return [
        'Good use of technical terminology',
        'Clear explanation of core concepts',
        'Consider adding more specific examples',
        'Well-structured response'
        ];
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 sm:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Exercise Report</h1>
                            <p className="mt-1 text-indigo-100">
                                Topics: {selectedTopics.map(t => t.name).join(', ')}
                            </p>
                        </div>
                        <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
                            <Trophy className="h-6 w-6 text-yellow-300 mr-2" />
                            <div>
                                <p className="text-sm text-indigo-100">Final Score</p>
                                <p className="text-2xl font-bold text-white">{lastExercise.score}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Questions Review */}
                <div className="px-6 py-6 sm:px-8">
                    <div className="space-y-8">
                        {lastExercise.questions.map((question, index) => {
                        const answer = lastExercise.answers[question.id];
                        const feedback = getQuestionFeedback(question, answer);
                        const Icon = feedback.icon;

                        return (
                            <div key={question.id} className="border-b border-gray-200 pb-6 last:border-0">
                                <div className="flex items-start">
                                    <div className={`${feedback.iconColor} mt-1 mr-4`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Question {index + 1}
                                        </h3>
                                        <p className="mt-2 text-gray-700">{question.text}</p>

                                        <div className="mt-4 bg-gray-50 rounded-lg p-4">
                                            <p className="text-sm font-medium text-gray-500">Your Answer:</p>
                                            <p className="mt-1 text-gray-900">{answer}</p>
                                        </div>

                                        <div className="mt-4">
                                            <p className="font-medium text-gray-900">Feedback:</p>
                                            <p className="mt-1 text-gray-600">{feedback.feedback}</p>
                                            
                                            {question.type === 'text' && (
                                            <div className="mt-3 space-y-2">
                                                {getTextAnswerFeedback(answer).map((item, i) => (
                                                <div key={i} className="flex items-center text-sm text-gray-600">
                                                    <ArrowRight className="h-4 w-4 mr-2 text-indigo-500" />
                                                    <span>{item}</span>
                                                </div>
                                                ))}
                                            </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                        })}
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-gray-50 px-6 py-4 sm:px-8 flex justify-between items-center">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-gray-600 hover:text-gray-900 font-medium"
                    >
                        View Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Practice More
                    </button>
                </div>
            </div>
        </div>
    );
}