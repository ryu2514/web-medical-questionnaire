
import React from 'react';
import type { Question } from '../types';

interface DateInputProps {
    question: Question;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DateInput: React.FC<DateInputProps> = ({ question, value, onChange }) => {
    return (
        <div>
            <label htmlFor={question.id} className="block text-md font-medium text-gray-700 mb-1">
                <span className="font-bold">{question.item}</span> {question.text}
            </label>
            <input
                type="date"
                id={question.id}
                name={question.id}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
    );
};
