import React from 'react';

interface SelectableButtonProps {
  isSelected: boolean;
  onClick: () => void;
  icon: React.ElementType;
  title: string;
  description: string;
}

const SelectableButton: React.FC<SelectableButtonProps> = ({ isSelected, onClick, icon: Icon, title, description }) => {
    return (
        <button
        onClick={onClick}
        className={`${
            isSelected
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
        } relative w-full rounded-t-lg border p-6 text-left transition-all duration-200 focus:outline-none h-full`}
        >
            <div className="flex items-center space-x-4">
                <div className={`${isSelected ? 'text-indigo-600' : 'text-gray-600'} rounded-lg p-2`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <h3 className={`${isSelected ? 'text-indigo-900' : 'text-gray-900'} text-lg font-medium`}>
                        {title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
            </div>
        </button>
    );
};

export default SelectableButton;