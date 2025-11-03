
import React from 'react';
import type { Section, FormData } from '../types';
import { TextInput } from './TextInput';
import { RadioGroup } from './RadioGroup';
import { CheckboxGroup } from './CheckboxGroup';
import { PainScale } from './PainScale';
import { TextArea } from './TextArea';
import { DateInput } from './DateInput';

interface QuestionnaireSectionProps {
    section: Section;
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handlePainScaleChange: (name: string, value: number) => void;
}

export const QuestionnaireSection: React.FC<QuestionnaireSectionProps> = ({ section, formData, handleChange, handlePainScaleChange }) => {
    return (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md transition-shadow hover:shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-6">
                <span className="text-blue-600">{section.level}</span> {section.title}
            </h2>
            <div className="space-y-6">
                {section.questions.map((q) => {
                    const value = formData[q.id];
                    switch (q.type) {
                        case 'text':
                            return <TextInput key={q.id} question={q} value={value as string || ''} onChange={handleChange} />;
                        case 'date':
                            return <DateInput key={q.id} question={q} value={value as string || ''} onChange={handleChange} />;
                        case 'radio':
                            return <RadioGroup key={q.id} question={q} value={value as string || ''} onChange={handleChange} formData={formData} />;
                        case 'checkbox':
                            return <CheckboxGroup key={q.id} question={q} value={value as string[] || []} onChange={handleChange} formData={formData} />;
                        case 'pain-scale':
                            return <PainScale key={q.id} question={q} value={value as number || 0} onChange={handlePainScaleChange} />;
                        case 'textarea':
                            return <TextArea key={q.id} question={q} value={value as string || ''} onChange={handleChange} />;
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};
