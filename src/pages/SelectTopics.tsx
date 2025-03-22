import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import api from '../api/api';

export function SelectTopics() {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [exerciseTypes, setExerciseTypes] = useState([]);
    const [selectedTopics, setSelectedTopics] = useStore((state) => [
        state.selectedTopics,
        state.setSelectedTopics
    ]);
    const [selectedExerciseType, setSelectedExerciseType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        try {
            const topicsData = await api.get('/thematiques');
            setTopics(topicsData);
            const exerciseTypesData = await api.get('/types_exercice');
            setExerciseTypes(exerciseTypesData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);

    const toggleTopic = (topic) => {
        const isSelected = selectedTopics.some((t) => t.id === topic.id);
        if (isSelected) {
        setSelectedTopics(selectedTopics.filter((t) => t.id !== topic.id));
        } else {
        setSelectedTopics([...selectedTopics, topic]);
        }
    };

    const startExercise = () => {
        if (selectedTopics.length > 0 && selectedExerciseType) {
        navigate('/exercise');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Select Topics and Exercise Type
                </h2>
                <div className="mt-8 space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">Topics</h3>
                        {topics.map((topic) => (
                        <div key={topic.id} className="bg-white p-4 rounded-lg shadow">
                            <button
                            onClick={() => toggleTopic(topic)}
                            className={`${
                                selectedTopics.some((t) => t.id === topic.id)
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-900'
                            } w-full py-2 px-4 rounded-md`}
                            >
                                {topic.nom}
                            </button>
                        </div>
                        ))}
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">Exercise Types</h3>
                        {exerciseTypes.map((type) => (
                            <div key={type.id} className="bg-white p-4 rounded-lg shadow">
                                <button
                                onClick={() => setSelectedExerciseType(type.id)}
                                className={`${
                                    selectedExerciseType === type.id
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-200 text-gray-900'
                                } w-full py-2 px-4 rounded-md`}
                                >
                                    {type.nom}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={startExercise}
                        disabled={selectedTopics.length === 0 || !selectedExerciseType}
                        className={`${
                        selectedTopics.length > 0 && selectedExerciseType
                            ? 'bg-indigo-600 hover:bg-indigo-700'
                            : 'bg-gray-300 cursor-not-allowed'
                        } text-white font-medium py-2 px-4 rounded-md`}
                    >
                        Start Exercise
                    </button>
                </div>
            </div>
        </div>
    );
}