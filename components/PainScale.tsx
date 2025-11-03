
import React from 'react';
import type { Question } from '../types';

interface PainScaleProps {
    question: Question;
    value: number;
    onChange: (name: string, value: number) => void;
}

export const PainScale: React.FC<PainScaleProps> = ({ question, value, onChange }) => (
    <div>
        <label className="block text-md font-medium text-gray-700">
            <span className="font-bold">{question.item}</span> {question.text}
        </label>
        {question.notes && <p className="text-sm text-gray-500 mb-2">{question.notes}</p>}
        <div className="mt-2 flex items-center space-x-4">
            <span className="text-lg font-bold text-blue-600 w-10 text-center">{value}</span>
            <input
                type="range"
                id={question.id}
                name={question.id}
                min="0"
                max="10"
                value={value}
                onChange={(e) => onChange(question.id, parseInt(e.target.value, 10))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
        </div>
         <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
            <span>0 (痛くない)</span>
            <span>10 (最悪の痛み)</span>
        </div>
    </div>
);
