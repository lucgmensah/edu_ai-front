import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import api from '../api/api';
import SelectableButton from '../components/SelectableButton';
import { BookOpen, ClipboardList } from 'lucide-react'; // Importez les icônes que vous souhaitez utiliser
import { LoadingScreen } from '../components/LoadingScreen';

export function SelectTopics() {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [exerciseTypes, setExerciseTypes] = useState([]);
    const [selectedTopics, setSelectedTopics] = useStore((state) => [
        state.selectedTopics,
        state.setSelectedTopics
    ]);
    const [selectedExerciseType, setSelectedExerciseType] = useState('');
    const [loading, setLoading] = useState(false);

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

    const startExercise = async () => {
        if (selectedTopics.length > 0 && selectedExerciseType) {
            setLoading(true);
            try {
                // Construire les données de l'exercice
                const exercise = {
                    titre: 'New Exercise', // Vous pouvez personnaliser ce titre
                    description: 'Generated exercise', // Vous pouvez personnaliser cette description
                    difficulte: 1, // Vous pouvez ajuster la difficulté
                    duree_estimee: 30, // Durée estimée en minutes
                    thematique_id: selectedTopics[0].id, // Utilise le premier topic sélectionné
                    type_exercice_id: selectedExerciseType // Type d'exercice sélectionné
                };
    
                // Envoyer la requête POST pour créer l'exercice
                const createdExercise = await api.post('/exercices/', exercise);
    
                // Rediriger vers la page de l'exercice créé
                navigate(`/exercise/${createdExercise.id}`);
            } catch (error) {
                console.error('Error creating exercise:', error);
                alert('An error occurred while creating the exercise. Please try again.');
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please select at least one topic and an exercise type.');
        }
    };

    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full ">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Select Topics and Exercise Type
                </h2>
                <div className="mt-8 space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Topics</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {topics.map((topic) => (
                            <div key={topic.id} className="bg-white rounded-lg shadow">
                                <SelectableButton
                                    isSelected={selectedTopics.some((t) => t.id === topic.id)}
                                    onClick={() => toggleTopic(topic)}
                                    icon={BookOpen} // Utilisez l'icône que vous souhaitez
                                    title={topic.nom}
                                    description={topic.description}
                                />
                            </div>
                        ))}
                    </div>

                    <h3 className="text-lg font-medium text-gray-900">Exercise Types</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {exerciseTypes.map((type) => (
                            <div key={type.id} className="bg-white rounded-lg shadow">
                                <SelectableButton
                                    isSelected={selectedExerciseType === type.id}
                                    onClick={() => setSelectedExerciseType(type.id)}
                                    icon={ClipboardList} // Utilisez l'icône que vous souhaitez
                                    title={type.nom}
                                    description={type.description}
                                />
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