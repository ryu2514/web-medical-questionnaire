
import React from 'react';
import type { Question, FormData } from '../types';

interface RadioGroupProps {
    question: Question;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: FormData;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ question, value, onChange, formData }) => {
    const otherInputName = `${question.id}_other`;
    const otherSelected = value === 'その他' && question.options?.includes('その他');

    return (
        <div>
            <label className="block text-md font-medium text-gray-700">
                <span className="font-bold">{question.item}</span> {question.text}
            </label>
            {question.notes && <p className="text-sm text-gray-500 mb-2">{question.notes}</p>}
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                {question.options?.map(option => (
                    <label key={option} className="inline-flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={value === option}
                            onChange={onChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                ))}
            </div>
            {otherSelected && (
                <div className="mt-2 pl-6">
                    <input
                        type="text"
                        name={otherInputName}
                        value={formData[otherInputName] as string || ''}
                        onChange={onChange}
                        placeholder="具体的に記入してください"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        aria-label={`${question.item || question.text} その他詳細`}
                    />
                </div>
            )}
        </div>
    );
};
