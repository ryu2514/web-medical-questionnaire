
import React from 'react';
import type { Question } from '../types';

interface TextAreaProps {
    question: Question;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({ question, value, onChange }) => (
    <div>
        <label htmlFor={question.id} className="block text-md font-medium text-gray-700">
            <span className="font-bold">{question.item}</span> {question.text}
        </label>
        {question.notes && <p className="text-sm text-gray-500 mb-2">{question.notes}</p>}
        <textarea
            id={question.id}
            name={question.id}
            rows={4}
            value={value}
            onChange={onChange}
            placeholder={question.placeholder}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
    </div>
);
