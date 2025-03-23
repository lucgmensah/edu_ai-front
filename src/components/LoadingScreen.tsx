import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

export function LoadingScreen() {
    const [progress, setProgress] = React.useState(0);
    const [currentStep, setCurrentStep] = React.useState(0);

    const steps = [
        'Analyzing selected topics...',
        'Generating personalized questions...',
        'Preparing your exercise...'
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                return 100;
            }
            return prev + 1;
        });
        }, 30);

        const stepInterval = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % steps.length);
        }, 2000);

        return () => {
            clearInterval(interval);
            clearInterval(stepInterval);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <div className="max-w-md w-full mx-4">
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <Brain className="h-16 w-16 text-white opacity-75" />
                        <div className="absolute -top-1 -right-1">
                            <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                        </div>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-white">Preparing Your Learning Experience</h2>
                    <p className="mt-2 text-indigo-100">{steps[currentStep]}</p>
                </div>

                <div className="bg-white bg-opacity-20 rounded-full h-3 relative overflow-hidden">
                    <div 
                        className="absolute left-0 top-0 bottom-0 bg-white transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                />
            </div>

                <div className="mt-4 flex justify-between text-sm text-indigo-100">
                    <span>Generating exercise</span>
                    <span>{progress}%</span>
                </div>

                <div className="mt-8">
                    <div className="flex justify-center space-x-2">
                        {[0, 1, 2].map((dot) => (
                        <div
                            key={dot}
                            className={`h-2 w-2 rounded-full ${
                            currentStep === dot 
                                ? 'bg-white' 
                                : 'bg-white bg-opacity-40'
                            } transition-all duration-300`}
                        />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}