import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export function Training() {
  const navigate = useNavigate();
  const [completedExercises, setCompletedExercises] = useState([]);

  useEffect(() => {
    const fetchCompletedExercises = async () => {
      try {
        const data = await api.get('/exercices');
        setCompletedExercises(data);
      } catch (error) {
        console.error('Error fetching completed exercises:', error);
      }
    };

    fetchCompletedExercises();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-1xl">
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate('/select-topics')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md"
          >
            New exercise
          </button>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Previous Exercises
        </h2>
        <div className="mt-8">
          {completedExercises.length === 0 ? (
            <p className="text-center text-gray-500">No exercises completed yet</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Topic
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    View
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {completedExercises.map((exercise) => (
                  <tr key={exercise.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exercise.titre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.difficulte}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.thematique.nom}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.type_exercice.nom}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => navigate(`/exercise/${exercise.id}`)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V7a1 1 0 112 0v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}