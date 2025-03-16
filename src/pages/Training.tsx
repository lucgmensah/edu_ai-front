import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Code, Calculator, Brain, Beaker, Music, Share2, History } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Topic, CompletedExercise } from '../types';

export const topics: Topic[] = [
  {
    id: '1',
    name: 'Mathematics',
    description: 'Algebra, geometry, and calculus exercises',
    icon: 'Calculator'
  },
  {
    id: '2',
    name: 'Programming',
    description: 'Coding challenges and algorithm problems',
    icon: 'Code'
  },
  {
    id: '3',
    name: 'Science',
    description: 'Physics, chemistry, and biology questions',
    icon: 'Beaker'
  },
  {
    id: '4',
    name: 'Literature',
    description: 'Reading comprehension and analysis',
    icon: 'Book'
  },
  {
    id: '5',
    name: 'Music Theory',
    description: 'Notes, scales, and harmony exercises',
    icon: 'Music'
  },
  {
    id: '6',
    name: 'Logic',
    description: 'Critical thinking and problem solving',
    icon: 'Brain'
  }
];

const iconComponents = {
  Calculator,
  Code,
  Beaker,
  Book,
  Music,
  Brain
};

export function Training() {
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useStore((state) => [
    state.selectedTopics,
    state.setSelectedTopics
  ]);
  const completedExercises = useStore((state) => state.completedExercises);

  const toggleTopic = (topic: Topic) => {
    const isSelected = selectedTopics.some((t) => t.id === topic.id);
    if (isSelected) {
      setSelectedTopics(selectedTopics.filter((t) => t.id !== topic.id));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const startExercise = () => {
    if (selectedTopics.length > 0) {
      navigate('/exercise');
    }
  };

  const shareExercise = (exercise: CompletedExercise) => {
    // Implement sharing functionality
    const shareData = {
      title: 'Check out my exercise results!',
      text: `I scored ${exercise.score}% on ${topics.find(t => t.id === exercise.topicId)?.name}`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Topics</h1>
        <p className="mt-2 text-gray-600">Select one or more subjects to practice</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const Icon = iconComponents[topic.icon as keyof typeof iconComponents];
          const isSelected = selectedTopics.some((t) => t.id === topic.id);
          const topicExercises = completedExercises.filter(e => e.topicId === topic.id);

          return (
            <div key={topic.id} className="bg-white rounded-lg shadow">
              <button
                onClick={() => toggleTopic(topic)}
                className={`${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                } relative w-full rounded-t-lg border p-6 text-left transition-all duration-200 focus:outline-none`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`${
                    isSelected ? 'text-indigo-600' : 'text-gray-600'
                  } rounded-lg p-2`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className={`${
                      isSelected ? 'text-indigo-900' : 'text-gray-900'
                    } text-lg font-medium`}>
                      {topic.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{topic.description}</p>
                  </div>
                </div>
              </button>

              {/* Exercise History */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <History className="h-4 w-4 mr-1" />
                    <span>Previous Exercises</span>
                  </div>
                  <button
                    onClick={startExercise}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    New Exercise
                  </button>
                </div>
                <div className="space-y-2">
                  {topicExercises.length === 0 ? (
                    <p className="text-sm text-gray-500">No exercises completed yet</p>
                  ) : (
                    topicExercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <div>
                          <p className="text-sm font-medium">Score: {exercise.score}%</p>
                          <p className="text-xs text-gray-500">{exercise.date}</p>
                        </div>
                        <button
                          onClick={() => shareExercise(exercise)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={startExercise}
          disabled={selectedTopics.length === 0}
          className={`${
            selectedTopics.length > 0
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-300 cursor-not-allowed'
          } px-6 py-3 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          Start Exercise
        </button>
      </div>
    </div>
  );
}