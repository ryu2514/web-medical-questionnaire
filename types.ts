
export interface Question {
    id: string;
    level: string;
    item: string;
    text: string;
    type: 'text' | 'radio' | 'checkbox' | 'pain-scale' | 'textarea' | 'date';
    options?: string[];
    placeholder?: string;
    notes?: string;
}

export interface Section {
    level: string;
    title: string;
    questions: Question[];
}

export interface TherapistCheckSection {
    title: string;
    questions: Question[];
}

export interface InfoSectionItem {
    text: string;
}

export interface FormData {
    [key: string]: string | number | string[] | undefined;
}
