
import React from 'react';
import type { Question } from '../types';

interface TextInputProps {
    question: Question;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ question, value, onChange }) => {
    // Hide empty text inputs that are supplemental to radio buttons
    if (question.item === '' && question.text === '') return null;
    
    return (
        <div>
            <label htmlFor={question.id} className="block text-md font-medium text-gray-700 mb-1">
                <span className="font-bold">{question.item}</span> {question.text}
            </label>
            <div className="flex items-center">
                <input
                    type="text"
                    id={question.id}
                    name={question.id}
                    value={value}
                    onChange={onChange}
                    placeholder={question.placeholder}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {question.notes && <span className="ml-2 text-gray-600">{question.notes}</span>}
            </div>
        </div>
    );
};
