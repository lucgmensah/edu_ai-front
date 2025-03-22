import React from 'react';
import { BarChart, Trophy, Target, Clock, Lightbulb, Share2 } from 'lucide-react';
import { useStore } from '../store/useStore';
// import { topics } from './Training';


export function Dashboard() {
  const performance = useStore((state) => state.performance);
  const recommendations = useStore((state) => state.recommendations);
  // const user = useStore((state) => state.user);

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
        <p className="mt-2 text-gray-600">Track your learning journey</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Trophy className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Exercises
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {performance.totalExercises}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Target className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Correct Answers
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {performance.correctAnswers}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Average Score
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {performance.averageScore.toFixed(1)}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Topics Completed
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {performance.topicsCompleted.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-4">
            <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recommended Topics
            </h3>
          </div>
          <div className="mt-4 space-y-4">
            <p className="text-gray-500">Complete more exercises to get personalized recommendations!</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Activity
          </h3>
          <div className="mt-4">
            {performance.topicsCompleted.length === 0 ? (
              <p className="text-gray-500">No activities yet. Start practicing!</p>
            ) : (
              <div className="space-y-4">
                {/* Add recent activity items here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}